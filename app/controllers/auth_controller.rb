include PayPal::SDK::OpenIDConnect

class AuthController < ApplicationController
  protect_from_forgery except: :auth

  def pusher
    response = Pusher[params[:channel_name]].authenticate params[:socket_id],
      user_id: params[:id],
      user_info: { name: params[:name] }

    render json: response
  end
end
