/**
 * CollaboratorController
 *
 * @description :: Server-side logic for managing collaborators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
var md5 = require('md5');
var request = require('request');

var self = module.exports = {



	findById: function(req, res) {
    var id = req.param('id');

    Collaborator.findOne({
      where: {
        id: id
      }
    }).then(function(collaboratorInstance) {
      if(collaboratorInstance === null) return res.notFound();
      else {
        return res.redirect(301, collaboratorInstance.uri);
      }
    }).catch(function(err) {
      return res.negotiate(err);
    });

  },


  findByName: function(req, res) {
    var name = req.param('name');


    Package.findAll({
      include: [
        { model: Repository,
          as: 'repository'
        },
        { model: PackageVersion,
          as: 'latest_version',
          attributes:['id', 'package_name', 'version', 'title', 'description', 'release_date', 'license', 'url', 'maintainer_id'],
          include: [
            { model: Collaborator, as: 'maintainer' },
            { model: Collaborator, as: 'collaborators'},
          ]
        }
      ],
      where: {
        $or:[
          sequelize.literal("`latest_version.maintainer`.`name` = '" + name + "'"),
          sequelize.literal("`latest_version.collaborators`.`name` = '" + name + "'"),
        ]
      }
    }).then(function(packages) {
      if(packages === null) return res.notFound();
      else {
        var json = {name: name };
        repositories = {
          cran: 0,
          bioconductor: 0,
          github: 0
        };
        json.packages = _.map(packages, function(package) {
          var latest = package.latest_version;
          if (latest.maintainer.name === name) {
            latest.is_maintainer = true;
          }
          var collaborators = _.filter(latest.collaborators, function(c) {
            return c.name === name;
          });

          if (collaborators.length > 0) {
            latest.is_contributor = true;
          }
          if(!json.email && latest.is_maintainer && latest.maintainer.email) {
            json.email = latest.maintainer.email;
          }
          if(!json.email && collaborators.length > 0 && collaborators[0].email) {
            json.email = collaborators[0].email;
          }
          repositories[package.repository.name] = repositories[package.repository.name]+1 || 1;
          return latest;
        });
        json.gravatar_url = 'https://www.gravatar.com/avatar/' + md5(_.trim(json.email).toLowerCase());
        json.packages = _.sortBy(json.packages, ['is_maintainer']);
        json.repositories = repositories;
        request("http://depsy.org/api/search/"+name,function(error,response,body){
          var resjson = JSON.parse(body);
          if(resjson.count>0){
            var id = resjson.list[0].id;
            request("http://depsy.org/api/person/"+id,function(error,response,body){
              var resjson = JSON.parse(body);
              json.impact = resjson.impact_percentile;
              return res.ok(json,"collaborator/show.ejs");
            });
          }
        });
      }
    });
  },
  getNumberOfDirectDownloads: function(req,res){
    var id = req.param('id');
    DownloadStatistic.getNumberOfDirectDownloads(id).then(function(results){
      res.json({
        total:results[0]
      });
    });
  }
};

