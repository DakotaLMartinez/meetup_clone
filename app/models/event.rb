class Event < ApplicationRecord
  belongs_to :user
  belongs_to :group
  has_many :user_events
  has_many :attendees, through: :user_events, source: :user

  validates :title, :description, :location, :start_time, :end_time, presence: true

  validates :title, uniqueness: { scope: [:location, :start_time], message: "can't rsvp to the same event more than once"}

  validate :starts_before_it_ends
  validate :does_not_conflict

  def starts_before_it_ends
    if end_time < start_time
      self.errors.add(:start_time, "must be before the end_time")
    end
  end

  def does_not_conflict
    starts_in_the_middle_of_an_another_event = self.user.events.any? do |event|
      self.start_time.between?(event.start_time, event.end_time)
    end
    if starts_in_the_middle_of_an_another_event
      self.errors.add(:start_time, "must not be in the middle of an existing event")
    end
    ends_in_the_middle_of_another_event = self.user.events.any? do |event|
      self.end_time.between?(event.start_time, event.end_time)
    end
    if ends_in_the_middle_of_an_another_event
      self.errors.add(:end_time, "must not be in the middle of an existing event")
    end
  end
end
