/*
 * css-wrap
 * https://github.com/benignware/css-wrap
 *
 * @See https://github.com/benignware/grunt-css-wrap
 * 
 * Forked and enhanced
 * https://github.com/zanzamar/grunt-css-wrap
 *
 * Copyright (c) 2014 Rafael Nowrotek
 * Licensed under the MIT license.
 *
 * Copyright (c) 2014 Zanzamar
 *
 */
var
  path = require( 'path' ),
  fs = require( 'fs' ),
  deepmerge = require( 'deepmerge' ),
  css_parse = require( 'css-parse' ),
  css_stringify = require( 'css-stringify' ),
  processRules = function( list, options ) {
    return list.map( function( r ) {
      if ( r.selectors ) {
        r.selectors.forEach( function( s, index ) {
          var selector = options.selector ? options.selector + " " + s : s;
          r.selectors[ index ] = selector;
        });
      }
      if ( r.type === "media" ) {
        r.rules = processRules( r.rules, options );
      }
      return r;
    });
  },
  css_wrap = function( string, options ) {
    options = deepmerge({
      // Defaults
      selector: ".css-wrap"
    }, options || {});
    if (fs.existsSync(path.resolve(string))) {
      string = fs.readFileSync(string).toString();
    }
    var css = css_parse( string );
    css.stylesheet.rules = processRules( css.stylesheet.rules, options );
    return css_stringify( css );
  };
module.exports = css_wrap;