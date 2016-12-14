# -*- encoding: utf-8 -*-

Gem::Specification.new do |spec|
  spec.name         = 'typey'

  spec.summary      = %q{A complete framework for working with typography in sass.}

  spec.homepage     = 'http://github.com/jptaranto/typey'
  spec.rubyforge_project =

  spec.version      = '1.0.3'
  spec.date         = '2016-07-19'
  spec.licenses     = ['GPL-2']

  spec.authors      = ['Jack Taranto']
  spec.email        = 'jacktaranto@gmail.com'

  spec.add_runtime_dependency('sass', "~> 3.3")

  spec.files        = `git ls-files`.split($/).select {|f| File.exist?(f) && f =~ %r{^(lib|stylesheets)/} }
  spec.files        += %w(
    LICENSE.txt
    README.md
    typey.gemspec
  )
end
