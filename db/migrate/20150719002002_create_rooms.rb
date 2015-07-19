class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :uuid
      t.integer :owner_id
      t.string :name
      t.text :description
      t.integer :active
      t.timestamps null: false
    end
  end
end
