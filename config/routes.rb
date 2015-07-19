Rails.application.routes.draw do
  match '/auth/pusher' => 'auth#pusher', via: :post
  match '/auth/pay' => 'auth#pusher', via: :post
  root to: 'rooms#index'

  resources :chats, only: [:new, :show]
  resources :rooms, only: [:create, :index, :show, :destroy]
end
