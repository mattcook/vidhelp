class ChatsController < ApplicationController

  def new
    @room = Room.last
  end
  def show
    @room = Room.find_by(uuid: params[:uuid])
  end

  def connect
    @room = Room.last
  end
end
