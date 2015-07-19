class RoomsController < ApplicationController

  def index
    @rooms = Room.all
  end

  def show
    @room = Room.find_by(uuid: params[:uuid])
  end

  def create
    Room.create!(uuid: params[:uuid], name: params[:name], owner_id: params[:user_id], active: 1)
  end
end
