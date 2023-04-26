class Page < ApplicationRecord
  belongs_to :user,
    foreign_key: :user_id,
    class_name: "User"

  belongs_to :journal,
    foreign_key: :journal_id,
    optional: true,
    class_name: "Page"

  before_validation :set_default_icon, :set_default_name, :set_default_status
  validates :page_icon, length: { in: 1..30 }, allow_nil: true
  validates :page_name, length: { in: 1..30 }, allow_nil: true
  validates :favorite, inclusion: [true, false], allow_nil: true
  validates :user_id, presence: true

  def set_default_icon
    if (!self.page_icon)
      self.page_icon = "Placeholder"
    end
  end

  def set_default_name
    if (!self.page_name)
      self.page_name = "Untitled"
    end
  end

  def set_default_status
    if (!self.favorite)
      self.favorite = false
    end
  end
end
