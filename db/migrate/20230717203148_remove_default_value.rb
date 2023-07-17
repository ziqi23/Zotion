class RemoveDefaultValue < ActiveRecord::Migration[7.0]
  def change
    change_column_default(:pages, :user_id, nil)
  end
end
