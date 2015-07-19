class RoomsController < ApplicationController

  def index
    @rooms = Room.get_all
  end

  def show
    @room = Room.get_all.last
  end
end
