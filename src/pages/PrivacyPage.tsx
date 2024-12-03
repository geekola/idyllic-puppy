import { motion } from 'framer-motion';

export function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-8">
            Privacy Policy
          </h1>
          <div className="mt-6 prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8">
              <p className="text-gray-600 dark:text-gray-300">
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>

              <p className="text-gray-600 dark:text-gray-300">
                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Interpretation and Definitions</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Interpretation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Definitions</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">For the purposes of this Privacy Policy:</p>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-300">
                <li>
                  <strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.
                </li>
                <li>
                  <strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                </li>
                <li>
                  <strong>Application</strong> refers to Spatial Mods, the software program provided by the Company.
                </li>
                <li>
                  <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Spatial Mods, LLC.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Collecting and Using Your Personal Data</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Types of Data Collected</h3>
              
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Personal Data</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Usage Data</li>
              </ul>

              <h4 className="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Usage Data</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Usage Data is collected automatically when using the Service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this Privacy Policy, You can contact us:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-600 dark:text-gray-300">
                <li>By email: <a href="mailto:contact@spatialmods.com">contact@spatialmods.com</a></li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}