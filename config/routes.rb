Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    resources :pages, only: [:index, :show, :create, :destroy, :update]
    resources :teams, only: [:index, :show, :create, :destroy, :update]
  end

  get '*path', to: 'static_pages#frontend'
end
