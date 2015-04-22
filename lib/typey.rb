require 'compass'

project_path     = File.join(File.dirname(__FILE__), '..')
stylesheets_path = File.join(project_path, 'stylesheets')

Compass::Frameworks.register(
  'typey',
  :path => project_path,
  :stylesheets_directory => stylesheets_path
)