ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' # Set up gems listed in the Gemfile.

# Override defaults to start Puma on port 7777 in development
require 'rails/commands/server'
module Rails
  class Server
    def default_options
      super.merge({
        Port: 3000
      })
    end
  end
end
