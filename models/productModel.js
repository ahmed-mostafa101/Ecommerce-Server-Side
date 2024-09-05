const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  reviewerName: {
    type: String,
    required: true
  },
  reviewerEmail: {
    type: String,
    required: true
  }
}, {_id: false, versionKey: false });

const metaSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  barcode: {
    type: String,
    required: true
  },
  qrCode: {
    type: String,
    required: true
  }
}, {_id: false, versionKey: false });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  salesCount: {
    type: Number,
    default: 0
  },
  brand: {
    type: String,
    default: 'Generic Brand'
  },
  warrantyInformation: {
    type: String,
    required: true
  },
  availabilityStatus: {
    type: String,
    required: true
  },
  reviews: {
    type: [reviewSchema],
    default: []
  },
  returnPolicy: {
    type: String,
    required: true
  },
  meta: {
    type: metaSchema,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  thumbnail: {
    type: String,
    required: true
  }
}, {versionKey: false });


productSchema.pre('save', function(next) {
  this.meta.updatedAt = Date.now();
  next();
});

productSchema.index({ category: 1 });
productSchema.index({ title: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
