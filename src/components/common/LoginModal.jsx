import { X, ExternalLink } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, isWhitePage = false }) {
  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    console.log('Continue with Google');
  };

  const handleLinkedInLogin = () => {
    console.log('Continue with LinkedIn');
  };

  const handleCreateAccount = () => {
    console.log('Create an account');
  };

  const handleLogin = () => {
    console.log('Log in');
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        /* ================================
           OVERLAY
        ================================= */

        .g2-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;

          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 30px;

          background: rgba(28, 29, 33, 0.68);

          overflow-y: auto;
        }

        /* ================================
           MODAL
        ================================= */

        .g2-modal {
          position: relative;

          width: 100%;
          max-width: 680px;
          min-height: 480px;

          display: grid;
          grid-template-columns: 1fr 1fr;

          background: #ffffff;

          border-radius: 20px;

          overflow: hidden;

          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.22);
        }

        /* ================================
           CLOSE BUTTON
        ================================= */

        .g2-close-btn {
          position: absolute;
          top: 16px;
          right: 23px;

          z-index: 10;

          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0;

          border: none;
          background: transparent;

          color: #999999;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .g2-close-btn:hover {
          color: #555555;
          transform: scale(1.08);
        }

        .g2-close-btn svg {
          width: 30px;
          height: 30px;
          stroke-width: 4;
        }

        /* ================================
           LEFT SECTION
        ================================= */

        .g2-left {
          width: 100%;

          display: flex;
          flex-direction: column;

          justify-content: flex-start;

          padding: 35px 28px 30px;

          background: #ffffff;
        }

        /* ================================
           IMAGE
        ================================= */

        .g2-image-box {
          width: 100%;
          height: 200px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 8px;

          overflow: hidden;
        }

        .g2-image-box img {
          width: 100%;
          height: 100%;

          object-fit: contain;
        }

        /* ================================
           LEFT TEXT
        ================================= */

        .g2-left-content {
          width: 100%;
          max-width: 320px;

          margin: 0 auto;
        }

        .g2-heading {
          margin: 0 0 15px;

          color: #292a35;

          font-size: 24px;
          line-height: 1.1;

          font-weight: 400;

          letter-spacing: -0.8px;
        }

        .g2-heading strong {
          font-weight: 700;
        }

        .g2-description {
          margin: 0;

          color: #30313b;

          font-size: 13px;
          line-height: 1.5;

          font-weight: 400;
        }

        /* ================================
           RIGHT SECTION
        ================================= */

        .g2-right {
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 45px 32px 35px;

          background: #ffffff;
        }

        .g2-right-inner {
          width: 100%;
          max-width: 280px;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ================================
           LINKEDIN
        ================================= */

        .g2-linkedin {
          width: 150px;
          height: 52px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          margin-bottom: 18px;

          border: none;
          border-radius: 22px;

          background: #5c45b9;

          color: #ffffff;

          font-size: 16px;
          font-weight: 500;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .g2-linkedin:hover {
          background: #4f3bab;
          transform: translateY(-1px);
        }

        .g2-linkedin-icon {
          width: 28px;
          height: 28px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #ffffff;

          color: #5c45b9;

          border-radius: 2px;

          font-size: 18px;
          font-weight: 800;
        }

        /* ================================
           DIVIDER
        ================================= */

        .g2-divider {
          width: 100%;

          display: flex;
          align-items: center;

          gap: 8px;

          margin-bottom: 18px;
        }

        .g2-divider-line {
          flex: 1;

          height: 1px;

          background: #cfcfcf;
        }

        .g2-divider-text {
          color: #30313b;

          font-size: 15px;

          font-weight: 600;

          white-space: nowrap;
        }

        /* ================================
           SOCIAL BUTTONS
        ================================= */

        .g2-social-btn {
          position: relative;

          width: 100%;
          height: 52px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 10px;

          border: 1px solid #cccccc;

          border-radius: 28px;

          background: #ffffff;

          color: #111111;

          font-size: 15px;
          font-weight: 600;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .g2-social-btn:hover {
          background: #fafafa;
          border-color: #b9b9b9;

          box-shadow:
            0 3px 12px rgba(0, 0, 0, 0.05);
        }

        .g2-social-icon {
          position: absolute;

          left: 18px;

          width: 28px;
          height: 28px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* GOOGLE */

        .g2-google {
          font-family: Arial, sans-serif;

          font-size: 22px;
          font-weight: 700;

          background: conic-gradient(
            from -45deg,
            #4285f4 0deg 90deg,
            #34a853 90deg 180deg,
            #fbbc05 180deg 270deg,
            #ea4335 270deg 360deg
          );

          -webkit-background-clip: text;
          background-clip: text;

          -webkit-text-fill-color: transparent;
        }

        /* G2 */

        .g2-g2 {
          width: 28px;
          height: 28px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #ff492c;

          color: #ffffff;

          font-size: 10px;
          font-weight: 800;
        }

        /* ================================
           EXISTING LOGIN
        ================================= */

        .g2-existing {
          margin: 0 0 35px;

          color: #666873;

          font-size: 13px;
          line-height: 1.4;

          text-align: center;
        }

        .g2-existing button {
          padding: 0;

          border: none;

          background: transparent;

          color: #0879e8;

          font-size: inherit;
          font-weight: 700;

          cursor: pointer;
        }

        .g2-existing button:hover {
          text-decoration: underline;
        }

        /* ================================
           TERMS
        ================================= */

        .g2-terms {
          margin: 0;

          color: #60616b;

          font-size: 11px;
          line-height: 1.45;

          text-align: center;
        }

        .g2-terms strong {
          font-weight: 700;
        }

        .g2-terms a {
          color: #0879b8;

          font-weight: 600;

          text-decoration: none;
        }

        .g2-terms a:hover {
          text-decoration: underline;
        }

        .g2-external {
          width: 12px;
          height: 12px;

          margin-left: 2px;

          vertical-align: -2px;
        }

        /* ================================
           TABLET
        ================================= */

        @media (max-width: 850px) {

          .g2-modal-overlay {
            padding: 16px;
          }

          .g2-modal {
            max-width: 620px;
            min-height: 450px;

            border-radius: 18px;
          }

          .g2-left {
            padding: 32px 24px 28px;
          }

          .g2-right {
            padding: 38px 28px 32px;
          }

          .g2-image-box {
            height: 180px;
          }

          .g2-heading {
            font-size: 22px;
          }

          .g2-description {
            font-size: 12px;
          }

          .g2-social-btn {
            height: 48px;
            font-size: 14px;
          }

          .g2-linkedin {
            height: 48px;
            font-size: 15px;
          }
        }

        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 650px) {

          .g2-modal-overlay {
            align-items: flex-start;

            padding: 8px;

            overflow-y: auto;
          }

          .g2-modal {
            width: 100%;
            max-width: 480px;

            min-height: auto;

            display: flex;
            flex-direction: column;

            border-radius: 16px;

            margin: auto;
          }

          .g2-close-btn {
            top: 8px;
            right: 8px;

            width: 36px;
            height: 36px;
          }

          .g2-close-btn svg {
            width: 24px;
            height: 24px;
          }

          /* LEFT */

          .g2-left {
            width: 100%;

            padding: 32px 20px 24px;

            text-align: center;

            align-items: center;
          }

          .g2-image-box {
            width: 100%;
            max-width: 240px;

            height: 160px;

            margin-bottom: 8px;
          }

          .g2-left-content {
            max-width: 380px;
          }

          .g2-heading {
            font-size: 20px;

            line-height: 1.15;

            letter-spacing: -0.6px;

            margin-bottom: 12px;
          }

          .g2-description {
            font-size: 12px;

            line-height: 1.5;
          }

          /* RIGHT */

          .g2-right {
            width: 100%;

            padding: 24px 20px 28px;
          }

          .g2-right-inner {
            max-width: 380px;
          }

          .g2-linkedin {
            width: 140px;
            height: 46px;

            border-radius: 20px;

            font-size: 15px;

            margin-bottom: 16px;
          }

          .g2-linkedin-icon {
            width: 26px;
            height: 26px;
            font-size: 16px;
          }

          .g2-divider {
            margin-bottom: 16px;
          }

          .g2-divider-text {
            font-size: 13px;
          }

          .g2-social-btn {
            height: 46px;

            font-size: 14px;

            margin-bottom: 10px;
          }

          .g2-social-icon {
            left: 16px;
            width: 26px;
            height: 26px;
          }

          .g2-google {
            font-size: 20px;
          }

          .g2-g2 {
            width: 26px;
            height: 26px;
            font-size: 9px;
          }

          .g2-existing {
            margin-bottom: 28px;

            font-size: 12px;
          }

          .g2-terms {
            max-width: 280px;

            font-size: 10px;
          }
        }

        /* ================================
           SMALL MOBILE
        ================================= */

        @media (max-width: 400px) {

          .g2-modal-overlay {
            padding: 5px;
          }

          .g2-modal {
            border-radius: 14px;
          }

          .g2-left {
            padding: 28px 16px 20px;
          }

          .g2-image-box {
            height: 140px;
            max-width: 200px;
          }

          .g2-heading {
            font-size: 18px;
            margin-bottom: 10px;
          }

          .g2-description {
            font-size: 11px;
          }

          .g2-right {
            padding: 20px 16px 24px;
          }

          .g2-linkedin {
            width: 130px;
            height: 44px;
            font-size: 14px;
          }

          .g2-linkedin-icon {
            width: 24px;
            height: 24px;
            font-size: 15px;
          }

          .g2-social-btn {
            height: 44px;
            font-size: 13px;
          }

          .g2-divider-text {
            font-size: 12px;
          }

          .g2-existing {
            font-size: 11px;
          }

          .g2-terms {
            font-size: 9px;
            max-width: 250px;
          }
        }

        /* ================================
           VERY SMALL MOBILE
        ================================= */

        @media (max-width: 340px) {

          .g2-modal-overlay {
            padding: 4px;
          }

          .g2-left {
            padding-left: 12px;
            padding-right: 12px;
          }

          .g2-right {
            padding-left: 12px;
            padding-right: 12px;
          }

          .g2-image-box {
            height: 120px;
            max-width: 180px;
          }

          .g2-heading {
            font-size: 17px;
          }

          .g2-description {
            font-size: 10px;
          }

          .g2-social-btn {
            font-size: 12px;
            height: 42px;
          }

          .g2-linkedin {
            width: 120px;
            height: 42px;
            font-size: 13px;
          }

          .g2-divider-text {
            font-size: 11px;
          }

          .g2-terms {
            font-size: 8.5px;
            max-width: 220px;
          }
        }
      `}</style>

      {/* ================================
          MODAL
      ================================= */}

      <div
        className="g2-modal-overlay"
        style={isWhitePage ? { background: '#ffffff', minHeight: '100vh', width: '100%' } : {}}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >

        <div className="g2-modal">

          {/* CLOSE */}

          <button
            type="button"
            className="g2-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X />
          </button>


          {/* ================================
              LEFT SIDE
          ================================= */}

          <div className="g2-left">

            <div className="g2-image-box">

              <img
                src="https://res.cloudinary.com/dez7clpi8/image/upload/v1786706931/Screenshot_2026-08-14_165035_sbjp9x.png"
                alt="Hunting for software insights"
              />

            </div>


            <div className="g2-left-content">

              <h2 className="g2-heading">
                Hunting for software <strong>insights</strong>?
              </h2>

              <p className="g2-description">
                With over 3 million reviews, we can provide the specific
                details that help you make an informed software buying
                decision for your business. Finding the right product is
                important, let us help.
              </p>

            </div>

          </div>


          {/* ================================
              RIGHT SIDE
          ================================= */}

          <div className="g2-right">

            <div className="g2-right-inner">

              {/* LINKEDIN */}

              <button
                type="button"
                className="g2-linkedin"
                onClick={handleLinkedInLogin}
              >

                <span className="g2-linkedin-icon">
                  in
                </span>

                <span>
                  LinkedIn
                </span>

              </button>


              {/* DIVIDER */}

              <div className="g2-divider">

                <span className="g2-divider-line"></span>

                <span className="g2-divider-text">
                  or continue with
                </span>

                <span className="g2-divider-line"></span>

              </div>


              {/* GOOGLE */}

              <button
                type="button"
                className="g2-social-btn"
                onClick={handleGoogleLogin}
              >

                <span className="g2-social-icon g2-google">
                  G
                </span>

                <span>
                  Google
                </span>

              </button>


              {/* CREATE ACCOUNT */}

              <button
                type="button"
                className="g2-social-btn"
                onClick={handleCreateAccount}
              >

                <span className="g2-social-icon">
                  <span className="g2-g2">
                    G2
                  </span>
                </span>

                <span>
                  Create an account
                </span>

              </button>


              {/* LOGIN */}

              <p className="g2-existing">

                Already have an account?{' '}

                <button
                  type="button"
                  onClick={handleLogin}
                >
                  Log in
                </button>

              </p>


              {/* TERMS */}

              <p className="g2-terms">

                <strong>
                  By proceeding, you agree to our
                </strong>

                <br />

                <a href="#">
                  Terms of Use
                  <ExternalLink className="g2-external" />
                </a>

                {' '}and{' '}

                <a href="#">
                  Privacy Policy
                </a>

                <br />

                <ExternalLink className="g2-external" />

              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}