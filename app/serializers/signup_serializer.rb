class SignupSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :workshop, :referral_type, :additional_notes

  def workshop
    {
      id: object.workshop.id,
      workshop_name: object.workshop.workshop_name,
      craft_type: object.workshop.craft_type
    }
  end
end
