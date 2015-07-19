class ChatsController < ApplicationController

  def new
    @room = Room.last
  end
  def show
    @room = Room.last
  end

  def connect
    @room = Room.last
  end
end
