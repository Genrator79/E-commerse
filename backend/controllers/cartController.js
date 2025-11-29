const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        // Transform to match frontend structure
        const formattedCart = {
            _id: cart._id,
            items: cart.items.map(item => ({
                ...item.product.toObject(),
                quantity: item.quantity
            })),
            total: cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
        };

        res.json(formattedCart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
    const { productId, quantity = 1 } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();

        // Return updated cart with populated products
        const updatedCart = await Cart.findById(cart._id).populate('items.product');

        const formattedCart = {
            _id: updatedCart._id,
            items: updatedCart.items.map(item => ({
                ...item.product.toObject(),
                quantity: item.quantity
            })),
            total: updatedCart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
        };

        res.json(formattedCart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    const productId = req.params.id;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            if (quantity > 0) {
                cart.items[itemIndex].quantity = quantity;
            } else {
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();

            const updatedCart = await Cart.findById(cart._id).populate('items.product');

            const formattedCart = {
                _id: updatedCart._id,
                items: updatedCart.items.map(item => ({
                    ...item.product.toObject(),
                    quantity: item.quantity
                })),
                total: updatedCart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
            };

            res.json(formattedCart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = async (req, res) => {
    const productId = req.params.id;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        const updatedCart = await Cart.findById(cart._id).populate('items.product');

        const formattedCart = {
            _id: updatedCart._id,
            items: updatedCart.items.map(item => ({
                ...item.product.toObject(),
                quantity: item.quantity
            })),
            total: updatedCart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
        };

        res.json(formattedCart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            cart.items = [];
            await cart.save();
        }

        res.json({ items: [], total: 0 });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
