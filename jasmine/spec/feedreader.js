/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Each feed has a URL defined and the URL is not empty
    it('should have their own URL', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe('');
      });
    });

    // Each feed has a name defined and the name is not empty
    it('should have their own name', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toBe('');
      });
    });

  });

  describe('The menu', function() {

    // The menu element is hidden by default
    it('should be hidden by default', function() {
      expect(document.body.classList).toContain('menu-hidden');
    });

    // The menu changes visibility when the menu icon is clicked
    it('changes visibility when the menu icon is clicked', function() {
      const menuIconLink = document.querySelector('.menu-icon-link');

      // Display the menu
      menuIconLink.click();
      expect(document.body.classList).not.toContain('menu-hidden');

      // Hide the menu
      menuIconLink.click();
      expect(document.body.classList).toContain('menu-hidden');
    });

  });

  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    /* There is at least a single .entry element within the .feed container
     * when the loadFeed function is called and completes its work
     */
    it('should have at least a single element', function(done) {
      const entryLink = document.getElementsByClassName('entry-link');
      expect(entryLink.length).toBeGreaterThan(0);
      done();
    });

  });

  describe('New Feed Selection', function() {

    const feed = document.querySelector('.feed');
    let oldFeed;

    loadFeed(0, function() {
      oldFeed = feed.innerHTML;
    });

    beforeEach(function(done) {
      loadFeed(1, done);
    });

    /* The content actually changes when a new feed is loaded
     * by the loadFeed function
     */
    it('should actually change the content', function(done) {
      expect(feed.innerHTML).not.toBe(oldFeed);
      done();
    });

  });

}());
