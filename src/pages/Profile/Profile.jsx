import './profile.style.css';

import { EditProfileContainer } from '../../components/EditProfileContainer/EditProfileContainer';
import { Navbar } from '../../components/Navbar/Navbar';
import { PageName } from '../../components/PageName/PageName';
import { Footer } from '../../components/Footer/Footer';

export function Profile() {
  return (
    <>
      <Navbar />
      <div className="profile-page-name">
        <PageName>Account Information</PageName>
      </div>
      <div className="profile-container">
        <EditProfileContainer />
      </div>
      <Footer />
    </>
  );
}
