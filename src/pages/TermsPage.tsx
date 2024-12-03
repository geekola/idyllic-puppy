import { motion } from 'framer-motion';

export function TermsPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-8">
            Terms of Use
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  DISCLAIMER
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    The information on the Spatial Mods websites and/or apps (http://spatialmods.com) is published in good faith and for general information purpose only. Spatial Mods does not make any warranties about the completeness, reliability and accuracy of this information.
                  </p>
                  <p>
                    You acknowledge that your use of Spatial Mods is at your own risk. We cannot guarantee the absence of unforeseen issues, including potential technical glitches, inappropriate user-generated content, or privacy concerns experienced by viewers of your interactive content.
                  </p>
                  <p>
                    Spatial Mods is not liable for any losses and/or damages in connection with the use of our services.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  External Links
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    From Spatial Mods website and/or app, you can visit other websites by following QR links, hyperlinks, and image links. While we strive to provide quality services and experiences, we encourage our users to exercise caution and ethical judgment with the content they access and offer. We do not control the content and nature of these external sites, and links do not imply endorsement from Spatial Mods.
                  </p>
                  <p>
                    Please be aware that external websites have their own privacy policies and terms of service which are beyond our control. Before engaging in any business or uploading any information, always review the external site's policies.
                  </p>
                </div>
              </section>

              <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  If you have any questions about these Terms of Use, please contact us at{' '}
                  <a 
                    href="mailto:legal@spatialmods.com" 
                    className="text-primary hover:text-highlight"
                  >
                    legal@spatialmods.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}