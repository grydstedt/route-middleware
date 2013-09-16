/**
 * Routing middleware based on url
 *
 * @package route-middleware
 * @author Gustav Rydstedt <gustav.rydstedt@gmail.com>
 */

/**
 * Dependencies
 */

/**
 * Export
 */
module.exports = function route(urlRegex, server) {
  if (!urlRegex) throw new Error('url regex required');
  if (!server) throw new Error('server required');
  var regexp = new RegExp('^' + urlRegex.replace(/[*]/g, '(.*?)') + '$', 'i');
  if (server.onvhost) server.onvhost(urlRegex);
  return function route(req, res, next){
    if (!req.headers.host) return next();
    var url = req.headers.host.split(':')[0] + req.url;
    if (!regexp.test(url)) return next();
    if ('function' == typeof server) return server(req, res, next);
    server.emit('request', req, res);
  };
};