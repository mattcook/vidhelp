class ChatsController < ApplicationController

  def new
    @room = Room.get_all.last
  end
  def show
    @room = Room.get_all.last
  end

  def connect
    @room = Room.get_all.last
  end
end
