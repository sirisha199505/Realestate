const BASE = import.meta.env.VITE_API_URL || '/api';

async function req(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();
  if (json.status === 'error') {
    const msg = typeof json.data === 'string'
      ? json.data
      : json.data
        ? Object.entries(json.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
        : 'Request failed';
    throw new Error(msg);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return json;
}

// Backend order statuses  ↔  frontend lead statuses
const ORDER_TO_LEAD = {
  pending:          'new',
  preparing:        'contacted',
  out_for_delivery: 'site-visit',
  delivered:        'closed',
  cancelled:        'closed',
};

const LEAD_TO_ORDER = {
  new:          'pending',
  contacted:    'preparing',
  'site-visit': 'out_for_delivery',
  closed:       'delivered',
};

// Convert a backend order record into the lead shape used by the UI
export function orderToLead(order) {
  const info = (order.items || [])[0] || {};
  return {
    id:        order.id,
    name:      order.customer_name,
    phone:     order.customer_phone,
    email:     info.email    || '',
    plotSize:  info.plotSize || '',
    message:   info.message  || '',
    source:    info.source   || 'contact_page',
    status:    ORDER_TO_LEAD[order.status] || 'new',
    createdAt: order.created_at,
  };
}

export const api = {
  // ── Auth ────────────────────────────────────────────────────────────
  login(email, password) {
    return req('POST', '/login', { data: { email, password } });
  },
  register(full_name, email, password, phone_number) {
    return req('POST', '/register', { data: { full_name, email, password, phone_number } });
  },

  // ── Public: enquiry form (stored as an order in DB) ─────────────────
  submitEnquiry(data) {
    return req('POST', '/orders', {
      customer_name:  data.name,
      customer_phone: data.phone,
      address_city:   'Kohir, Sangareddy',
      payment_method: 'enquiry',
      items: [{
        email:    data.email    || '',
        plotSize: data.plotSize || '',
        message:  data.message  || '',
        source:   data.source   || 'contact_page',
      }],
      item_total:   0,
      delivery_fee: 0,
      platform_fee: 0,
      grand_total:  0,
    });
  },

  // ── Admin ────────────────────────────────────────────────────────────
  getOrders(token) {
    return req('GET', '/admin/orders', undefined, token);
  },
  updateOrderStatus(id, leadStatus, token) {
    const status = LEAD_TO_ORDER[leadStatus] ?? leadStatus;
    return req('PUT', `/admin/orders/${id}`, { status }, token);
  },
  getCustomers(token) {
    return req('GET', '/admin/customers', undefined, token);
  },
};
