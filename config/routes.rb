Rails.application.routes.draw do
  match '/auth/pusher' => 'auth#pusher', via: :post

  root to: 'rooms#index'

  resources :chats, only: [:new, :show]
  resources :rooms, only: [:create, :index, :show]

  match '/payment' => 'rooms#delete', via: :get
end
