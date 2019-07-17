module FilmsHelper
  def get_details(urls)
    Parallel.map(urls) do |url|
      data = HTTParty.get(url)
			JSON.parse data.body
    end
  end

  def get_id(url)
    url.last(2).remove("/")
  end
end
