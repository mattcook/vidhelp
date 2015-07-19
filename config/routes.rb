Rails.application.routes.draw do
  match '/auth/pusher' => 'auth#pusher', via: :post
  match '/auth/pay' => 'auth#pusher', via: :post
  root to: 'chats#index'

  resources :chats, only: [:index, :show]
  resources :rooms, only: [:create, :index, :show, :destroy]
end
