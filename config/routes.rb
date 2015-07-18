Rails.application.routes.draw do
  match '/pusher/auth' => 'pusher#auth', via: :post
  root to: 'pages#root'

  resources :chat, only: [:index]
end
