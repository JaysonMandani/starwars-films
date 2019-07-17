Rails.application.routes.draw do
  resources :films, only: [:index, :show]

  root 'films#index'
end
