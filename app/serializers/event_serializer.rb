class ChangedEventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :start_time, :end_time
end
