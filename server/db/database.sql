

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL
);




CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;



CREATE TABLE public.carts_products (
    id integer NOT NULL,
    quantity integer NOT NULL,
    product_id integer NOT NULL,
    cart_id integer NOT NULL,
    size character varying(15)
);




CREATE SEQUENCE public.carts_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




ALTER SEQUENCE public.carts_products_id_seq OWNED BY public.carts_products.id;




CREATE TABLE public.orders (
    id integer NOT NULL,
    status character varying(100) NOT NULL,
    total double precision NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL
);




CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;




CREATE TABLE public.orders_products (
    id integer NOT NULL,
    quantity integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    size character varying(15)
);




CREATE SEQUENCE public.orders_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




ALTER SEQUENCE public.orders_products_id_seq OWNED BY public.orders_products.id;




CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    price double precision NOT NULL,
    description character varying(500) NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL,
    images character varying[],
    categories character varying[],
    sizes character varying[]
);




CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;




CREATE SEQUENCE public.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;




CREATE TABLE public.refresh_tokens (
    email character varying(100) NOT NULL,
    token character varying NOT NULL,
    expiry timestamp without time zone NOT NULL,
    id integer DEFAULT nextval('public.refresh_tokens_id_seq'::regclass) NOT NULL
);




CREATE TABLE public.users (
    id integer NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL,
    roles character varying(100) DEFAULT USER NOT NULL,
    address1 character varying(100),
    address2 character varying(100),
    city character varying(100),
    postcode character varying(10),
    country character varying(100)
);




CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;




ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);




ALTER TABLE ONLY public.carts_products ALTER COLUMN id SET DEFAULT nextval('public.carts_products_id_seq'::regclass);




ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);




ALTER TABLE ONLY public.orders_products ALTER COLUMN id SET DEFAULT nextval('public.orders_products_id_seq'::regclass);




ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);




ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);




ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_pkey PRIMARY KEY (id);




ALTER TABLE public.carts_products
    ADD CONSTRAINT positive_quantity CHECK ((quantity > 0)) NOT VALID;




ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "refreshTokens_pkey" PRIMARY KEY (id);




ALTER TABLE public.users
    ADD CONSTRAINT text_only_first_name CHECK (((first_name)::text !~ similar_to_escape('%[0-9]%'::text))) NOT VALID;




ALTER TABLE public.users
    ADD CONSTRAINT text_only_last_name CHECK (((last_name)::text !~ similar_to_escape('%[0-9]%'::text))) NOT VALID;




ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);




ALTER TABLE ONLY public.carts
    ADD CONSTRAINT unique_user_id UNIQUE (user_id);




ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id);




ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);




ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);




ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);




ALTER TABLE ONLY public.orders
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);




ALTER TABLE ONLY public.carts
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);



