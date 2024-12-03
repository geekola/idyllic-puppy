AA
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Create immersive AR experiences in seconds. No coding required.
            </p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={handleGetStarted}
                disabled={isNavigating}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#3e53a0] hover:bg-[#3e53a0]/90 transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3e53a0]"
                aria-label="Get Started with Spatial Mods"
              >
                {isNavigating ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Loading...
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}