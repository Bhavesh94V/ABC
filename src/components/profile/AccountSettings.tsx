import DeleteAccount from "./DeleteAccount"
import DownloadUserData from "./DownloadUserData"

const AccountSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Manage your account preferences and privacy settings</p>
      </div>

      {/* Your Data */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Data</h3>
        <DownloadUserData />
      </div>

      {/* Danger Zone */}
      <div>
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-500 mb-4">Danger Zone</h3>
        <DeleteAccount />
      </div>
    </div>
  )
}

export default AccountSettings
