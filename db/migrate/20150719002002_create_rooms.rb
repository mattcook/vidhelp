class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :name
      t.integer :uuid
      t.integer :owner_id
      t.timestamps null: false
    end
  end
end
