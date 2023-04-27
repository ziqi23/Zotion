class User < ApplicationRecord
    has_many :pages,
        foreign_key: :user_id,
        class_name: "Page",
        dependent: :destroy
    
    has_many :team_users,
        foreign_key: :user_id,
        class_name: "TeamUser"

    has_many :teams,
        through: :team_users,
        source: :team

    has_secure_password
    before_validation :ensure_session_token

    validates :username, :email, :session_token, uniqueness:true
    validates :username, length: { in: 3..30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email"}
    validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { in: 6..255 }, allow_nil: true
    
    def self.find_by_credentials(credential, password)
        if (credential.match?(URI::MailTo::EMAIL_REGEXP))
            user = User.find_by(email: credential)
        else
            user = User.find_by(username: credential)
        end
        if (user&.authenticate(password))
            return user
        else
            return nil
        end
    end

    def reset_session_token!
        self.session_token = generate_session_token
        self.save!
        return self.session_token
    end

    private

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

    def generate_session_token
        token = SecureRandom::urlsafe_base64
        while (User.exists?(session_token: token))
            token = SecureRandom::urlsafe_base64
        end
        return token;
    end
end
