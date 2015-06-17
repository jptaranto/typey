#
# This file is only needed for Compass/Sass integration. If you are not using
# Compass, you may safely ignore or delete this file.
#
# If you'd like to learn more about Sass and Compass, see the sass/README.txt
# file for more information.
#


# Require any additional compass plugins installed on your system.
require 'breakpoint'
require 'compass/import-once/activate'
#require 'sass-globbing'
#require 'zen-grids'
require 'typey'

# Location of the theme's resources.
css_dir         = "css"
sass_dir        = "sass"
fonts_dir       = "fonts"
images_dir      = "images"
javascripts_dir = "js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :compressed

# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server root.
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# CSS sourcemaps
sourcemap = true

# Pass options to sass.
# sass_options = {}
