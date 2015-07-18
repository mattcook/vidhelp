Rails.application.routes.draw do
  match '/pusher/auth' => 'pusher#auth', via: :post
  root to: 'chat#index'

  resources :chat, only: [:index]
end
