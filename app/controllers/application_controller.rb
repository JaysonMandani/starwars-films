class ApplicationController < ActionController::Base
  include HTTParty

  base_uri 'https://swapi.co/api/'
end
