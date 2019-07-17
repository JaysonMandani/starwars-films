class FilmsController < ApplicationController
  include HTTParty

  base_uri 'https://swapi.co/api/'

  def index
    data = self.class.get("/films/")
    @films = data['results']
  end

  def show
    @film = self.class.get("/films/#{params[:id]}")
  end
end
