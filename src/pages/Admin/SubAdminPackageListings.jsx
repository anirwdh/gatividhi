import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../Subadmin/SubadminListing.css';

const SubAdminPackageListings = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const subadmin = location.state?.subadmin;
  const subadminName = subadmin?.name || `Subadmin #${id}`;
  const [activeFilter, setActiveFilter] = useState('active');

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
        date: 'Started on 10 January 2026',
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
        date: 'Started on 5 January 2026',
      },
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
        date: null,
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
        date: 'started on 6 January 2026',
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
        date: 'started on 8 January 2026',
      },
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
        date: 'Ended on 31 December 2025',
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
        date: 'Ended on 25 December 2025',
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
        date: 'Ended on 20 December 2025',
      },
    ],
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

  return (
    <div className="subadmin-listing-page">
      <div className="listing-page-header">
        <h1 className="listing-page-title">Packages by {subadminName}</h1>
        <div className="listing-page-actions"></div>
      </div>

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

      <div className="listings-container">
        <div className="listings-scroll">
          {getFilteredListings().length > 0 ? (
            getFilteredListings().map((listing) => (
              <div
                key={listing.id}
                className="listing-card tour-card"
                onClick={() => {
                  const normalizedListing = {
                    ...listing,
                    images: Array.isArray(listing.images)
                      ? listing.images
                      : listing.image
                        ? [listing.image]
                        : [],
                    dateOptions: listing.dateOptions || { everyday: false, everyWeekend: false },
                    contactInfo: listing.contactInfo || { email: '', phone: '', website: '' },
                    itinerary: Array.isArray(listing.itinerary) ? listing.itinerary : [],
                    timeSlots: Array.isArray(listing.timeSlots) ? listing.timeSlots : []
                  };
                  navigate('/admin/listing-detail', {
                    state: {
                      listingData: normalizedListing,
                      backPath: location.pathname
                    }
                  });
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="tour-card-image-wrapper">
                  {listing.image ? (
                    <div
                      className="tour-card-image"
                      style={{ backgroundImage: `url(${listing.image})` }}
                    ></div>
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
                  {listing.location && <p className="tour-location">{listing.location}</p>}
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
                  {listing.date && <p className="listing-date">{listing.date}</p>}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubAdminPackageListings;
