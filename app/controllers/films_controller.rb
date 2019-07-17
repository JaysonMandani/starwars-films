class FilmsController < ApplicationController
  include HTTParty

  base_uri 'https://swapi.co/api/'

  def index
    begin
      data = self.class.get("/films/")
      @films = data['results']
    rescue StandardError => e
      return e
    end
  end

  def show
    begin
      @film = self.class.get("/films/#{params[:id]}")
    rescue StandardError => e
      return e
    end
  end
end
