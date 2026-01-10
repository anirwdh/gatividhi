import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubadminListing.css';

const SubadminListing = ({ onNavigateToCreate }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('active');

  // Sample listing data - will come from backend
  const listings = {
    active: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        location: 'Rishikesh, Uttarakhand',
        rating: 4.9,
        reviews: 1234,
        title: 'Bungee Jumping in Rishikesh',
        price: 3790,
        originalPrice: null,
        date: 'Started on 15 January 2026',
        dateOptions: {
          everyday: true,
          everyWeekend: false
        },
        propertyType: 'Adventure Activity',
        availability: '1-365 night stays',
        advanceNotice: 'Same-day advance notice',
        guests: 2,
        description: 'Experience the thrill of bungee jumping from India\'s highest platform in Rishikesh. This exhilarating adventure activity takes you 83 meters above the ground, offering breathtaking views of the surrounding mountains and the Ganges River.',
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400',
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400'
        ],
        included: ['Professional guide', 'Safety equipment'],
        notIncluded: ['Transportation'],
        departurePoint: 'Jumpin Heights',
        dropPoint: 'Jumpin Heights',
        itinerary: [{title: 'Briefing', description: '...', duration: '...', admission: '...'}],
        timeSlots: ['8:00 AM'],
        itineraryIntro: '...',
        contactInfo: {
          email: 'contact@jumpinheights.com',
          phone: '+91 9876543210',
          website: 'https://www.jumpinheights.com'
        }
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400',
        location: 'Manali, Himachal Pradesh',
        rating: 4.8,
        reviews: 892,
        title: 'Snow Diving in Manali',
        price: 4599,
        originalPrice: 5299,
        date: 'Started on 10 January 2026'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
        location: 'Shimla, Himachal Pradesh',
        rating: 5.0,
        reviews: 567,
        title: 'Luxury Penthouse with Mountain View',
        price: 6899,
        originalPrice: null,
        date: 'Started on 5 January 2026'
      }
    ],
    inProgress: [
      {
        id: 4,
        image: null,
        location: 'New Delhi, India',
        rating: null,
        reviews: null,
        title: 'Your Flat listing',
        price: null,
        originalPrice: null,
        date: null
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        location: 'Goa, India',
        rating: null,
        reviews: null,
        title: 'Your Flat listing',
        price: null,
        originalPrice: null,
        date: 'started on 6 January 2026'
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
        location: 'Mumbai, Maharashtra',
        rating: null,
        reviews: null,
        title: 'Beachside Villa Retreat',
        price: null,
        originalPrice: null,
        date: 'started on 8 January 2026'
      }
    ],
    past: [
      {
        id: 7,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
        location: 'Jaipur, Rajasthan',
        rating: 4.7,
        reviews: 654,
        title: 'Historic Downtown Loft',
        price: 3299,
        originalPrice: null,
        date: 'Ended on 31 December 2025'
      },
      {
        id: 8,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        location: 'Udaipur, Rajasthan',
        rating: 4.6,
        reviews: 432,
        title: 'Cozy Countryside Cottage',
        price: 2799,
        originalPrice: null,
        date: 'Ended on 25 December 2025'
      },
      {
        id: 9,
        image: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=400',
        location: 'Bangalore, Karnataka',
        rating: 4.8,
        reviews: 789,
        title: 'Urban Garden Apartment',
        price: 3499,
        originalPrice: null,
        date: 'Ended on 20 December 2025'
      }
    ]
  };

  const getFilteredListings = () => {
    switch (activeFilter) {
      case 'past':
        return listings.past;
      case 'active':
        return listings.active;
      case 'upcoming':
        return listings.inProgress;
      default:
        return [];
    }
  };

  const handleCreateNew = () => {
    if (onNavigateToCreate) {
      onNavigateToCreate();
    } else {
      navigate('/subadmin/home');
    }
  };

  return (
    <div className="subadmin-listing-page">
      <div className="listing-page-header">
        <h1 className="listing-page-title">Your listings</h1>
        <div className="listing-page-actions">
          
          <button className="add-listing-btn" onClick={handleCreateNew}>
            <svg width="98" height="78" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="listing-filters">
        <button
          className={`filter-chip ${activeFilter === 'past' ? 'active' : ''}`}
          onClick={() => setActiveFilter('past')}
        >
          Past
        </button>
        <button
          className={`filter-chip ${activeFilter === 'active' ? 'active' : ''}`}
          onClick={() => setActiveFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-chip ${activeFilter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveFilter('upcoming')}
        >
          Upcoming
        </button>
      </div>

      {/* Listings Grid */}
      <div className="listings-container">
        <div className="listings-scroll">
          {getFilteredListings().length > 0 ? (
            getFilteredListings().map((listing) => (
              <div 
                key={listing.id} 
                className="listing-card tour-card"
                onClick={() => navigate('/subadmin/listing-detail', { state: { listingData: listing } })}
                style={{ cursor: 'pointer' }}
              >
                <div className="tour-card-image-wrapper">
                  {listing.image ? (
                    <div 
                      className="tour-card-image"
                      style={{ backgroundImage: `url(${listing.image})` }}
                    >
                    </div>
                  ) : (
                    <div className="tour-card-image listing-image-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="tour-card-content listing-card-content">
                  {listing.location && (
                    <p className="tour-location">{listing.location}</p>
                  )}
                  {listing.rating && (
                    <div className="tour-rating">
                      <span className="rating-star">★</span>
                      <span className="rating-value">{listing.rating}</span>
                      {listing.reviews && (
                        <span className="rating-reviews">({listing.reviews.toLocaleString()})</span>
                      )}
                    </div>
                  )}
                  <h3 className="tour-title listing-title">{listing.title}</h3>
                  {listing.price && (
                    <>
                      <div className="tour-price">
                        {listing.originalPrice ? (
                          <>
                            <span className="price-current">from ₹{listing.price.toLocaleString()}</span>
                            <span className="price-original">₹{listing.originalPrice.toLocaleString()}</span>
                          </>
                        ) : (
                          <span className="price-current">from ₹{listing.price.toLocaleString()}</span>
                        )}
                      </div>
                      <p className="price-note">Price varies by group size</p>
                    </>
                  )}
                  {listing.date && (
                    <p className="listing-date">{listing.date}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-listings">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <p className="empty-message">No listings found</p>
              <button className="create-first-btn" onClick={handleCreateNew}>
                Create your first listing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubadminListing;

