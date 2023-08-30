-- migrate:up
ALTER TABLE ticket_prices
ADD COLUMN price DECIMAL(9,2) NOT NULL
CHANGE is_earylbird is_earlybird BOOLEAN NOT NULL;

-- migrate:down

