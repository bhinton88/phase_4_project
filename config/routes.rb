Rails.application.routes.draw do
  
  resources :signups, only: [:create, :destroy ,:update]
  resources :workshops, only: [:create, :index]
  resources :users, only: [:create]

  get "/me", to: "users#show"
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/big/:number_of_enrollees", to: "workshops#big"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
