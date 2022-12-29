
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    select.selectedIndex = -1; // no option should be selected
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
function construct_svelte_component(component, props) {
    return new component(props);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
 */
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind(component, name, callback, value) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        if (value === undefined) {
            callback(component.$$.ctx[index]);
        }
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            // if the component was destroyed immediately
            // it will update the `$$.on_destroy` reference to `null`.
            // the destructured on_destroy may still reference to the old array
            if (component.$$.on_destroy) {
                component.$$.on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        if (!is_function(callback)) {
            return noop;
        }
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

var Util = {
    testImgUrl(url){
		return new Promise(function(resolve) {
			const timeout = 5000;
			let timer, img = new Image();
			img.onerror = img.onabort = function() {
				clearTimeout(timer);
				resolve(false);
			};
			img.onload = function() {
				clearTimeout(timer);
				resolve(true);
			};
			timer = setTimeout(function() {
				img.src = "//!!!!/noexist.jpg";
				resolve(false);
			}, timeout); 
			img.src = url;
		});
	},

	testVideoUrl(url){
		return /^https?:\/\/.*\.(mp4|ogg|webm)$/i.test(url.trim())
	},

	parseYouTube(str) {
		// url : //youtube.com/watch?v=Bo_deCOd1HU
		// share : //youtu.be/Bo_deCOd1HU
		// embed : //youtube.com/embed/Bo_deCOd1HU
		
		const re = /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i; 
		const matches = re.exec(str);
		if (matches && matches[1]){
			return 'https://www.youtube.com/embed/'+matches[1]
		}
	},

	parseVimeo(str) {
		// http://vimeo.com/86164897
		
		const re = /\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i;
		const matches = re.exec(str);
		if(matches && matches[1]) {
			return 'https://player.vimeo.com/video/'+matches[1]
		}
	}
};

/* ../tailwind-editor/src/Editor/ContentEditor.svelte generated by Svelte v3.55.0 */

const { window: window_1$2 } = globals;

function create_else_block$d(ctx) {
	let div;
	let raw_value = /*html*/ ctx[0].replace(/<div.*Edit iframe.*?<\/div>/gs, '') + "";
	let div_class_value;

	return {
		c() {
			div = element("div");
			attr(div, "class", div_class_value = "relative " + /*gklass*/ ctx[1]);
			attr(div, "data-txteditor", "true");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			div.innerHTML = raw_value;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*html*/ 1 && raw_value !== (raw_value = /*html*/ ctx[0].replace(/<div.*Edit iframe.*?<\/div>/gs, '') + "")) div.innerHTML = raw_value;
			if (dirty[0] & /*gklass*/ 2 && div_class_value !== (div_class_value = "relative " + /*gklass*/ ctx[1])) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (1081:17) 
function create_if_block_7(ctx) {
	let br;

	return {
		c() {
			br = element("br");
		},
		m(target, anchor) {
			insert(target, br, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(br);
		}
	};
}

// (1077:17) 
function create_if_block_6(ctx) {
	let h6;
	let h6_class_value;

	return {
		c() {
			h6 = element("h6");
			attr(h6, "class", h6_class_value = "relative " + /*gklass*/ ctx[1]);
			attr(h6, "data-txteditor", "true");
		},
		m(target, anchor) {
			insert(target, h6, anchor);
			h6.innerHTML = /*html*/ ctx[0];
		},
		p(ctx, dirty) {
			if (dirty[0] & /*html*/ 1) h6.innerHTML = /*html*/ ctx[0];
			if (dirty[0] & /*gklass*/ 2 && h6_class_value !== (h6_class_value = "relative " + /*gklass*/ ctx[1])) {
				attr(h6, "class", h6_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(h6);
		}
	};
}

// (1073:17) 
function create_if_block_5$1(ctx) {
	let h5;
	let h5_class_value;

	return {
		c() {
			h5 = element("h5");
			attr(h5, "class", h5_class_value = "relative " + /*gklass*/ ctx[1]);
			attr(h5, "data-txteditor", "true");
		},
		m(target, anchor) {
			insert(target, h5, anchor);
			h5.innerHTML = /*html*/ ctx[0];
		},
		p(ctx, dirty) {
			if (dirty[0] & /*html*/ 1) h5.innerHTML = /*html*/ ctx[0];
			if (dirty[0] & /*gklass*/ 2 && h5_class_value !== (h5_class_value = "relative " + /*gklass*/ ctx[1])) {
				attr(h5, "class", h5_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(h5);
		}
	};
}

// (1069:17) 
function create_if_block_4$3(ctx) {
	let h4;
	let h4_class_value;

	return {
		c() {
			h4 = element("h4");
			attr(h4, "class", h4_class_value = "relative " + /*gklass*/ ctx[1]);
			attr(h4, "data-txteditor", "true");
		},
		m(target, anchor) {
			insert(target, h4, anchor);
			h4.innerHTML = /*html*/ ctx[0];
		},
		p(ctx, dirty) {
			if (dirty[0] & /*html*/ 1) h4.innerHTML = /*html*/ ctx[0];
			if (dirty[0] & /*gklass*/ 2 && h4_class_value !== (h4_class_value = "relative " + /*gklass*/ ctx[1])) {
				attr(h4, "class", h4_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(h4);
		}
	};
}

// (1065:17) 
function create_if_block_3$5(ctx) {
	let h3;
	let h3_class_value;

	return {
		c() {
			h3 = element("h3");
			attr(h3, "class", h3_class_value = "relative " + /*gklass*/ ctx[1]);
			attr(h3, "data-txteditor", "true");
		},
		m(target, anchor) {
			insert(target, h3, anchor);
			h3.innerHTML = /*html*/ ctx[0];
		},
		p(ctx, dirty) {
			if (dirty[0] & /*html*/ 1) h3.innerHTML = /*html*/ ctx[0];
			if (dirty[0] & /*gklass*/ 2 && h3_class_value !== (h3_class_value = "relative " + /*gklass*/ ctx[1])) {
				attr(h3, "class", h3_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(h3);
		}
	};
}

// (1061:17) 
function create_if_block_2$8(ctx) {
	let h2;
	let h2_class_value;

	return {
		c() {
			h2 = element("h2");
			attr(h2, "class", h2_class_value = "relative " + /*gklass*/ ctx[1]);
			attr(h2, "data-txteditor", "true");
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			h2.innerHTML = /*html*/ ctx[0];
		},
		p(ctx, dirty) {
			if (dirty[0] & /*html*/ 1) h2.innerHTML = /*html*/ ctx[0];
			if (dirty[0] & /*gklass*/ 2 && h2_class_value !== (h2_class_value = "relative " + /*gklass*/ ctx[1])) {
				attr(h2, "class", h2_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(h2);
		}
	};
}

// (1057:1) {#if ish1 }
function create_if_block_1$c(ctx) {
	let h1;
	let h1_class_value;

	return {
		c() {
			h1 = element("h1");
			attr(h1, "class", h1_class_value = "relative " + /*gklass*/ ctx[1]);
			attr(h1, "data-txteditor", "true");
		},
		m(target, anchor) {
			insert(target, h1, anchor);
			h1.innerHTML = /*html*/ ctx[0];
		},
		p(ctx, dirty) {
			if (dirty[0] & /*html*/ 1) h1.innerHTML = /*html*/ ctx[0];
			if (dirty[0] & /*gklass*/ 2 && h1_class_value !== (h1_class_value = "relative " + /*gklass*/ ctx[1])) {
				attr(h1, "class", h1_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(h1);
		}
	};
}

// (1053:0) {#if editable}
function create_if_block$t(ctx) {
	let div;
	let div_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			attr(div, "data-txtcustom", /*custom*/ ctx[3]);
			attr(div, "data-txteditor", "true");
			attr(div, "spellcheck", "false");
			attr(div, "contenteditable", "true");
			attr(div, "class", div_class_value = "outline-none focus:outline-none relative " + /*gklass*/ ctx[1]);
			if (/*html*/ ctx[0] === void 0) add_render_callback(() => /*div_input_handler*/ ctx[22].call(div));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			/*div_binding*/ ctx[21](div);

			if (/*html*/ ctx[0] !== void 0) {
				div.innerHTML = /*html*/ ctx[0];
			}

			if (!mounted) {
				dispose = [
					action_destroyer(/*setEditorNode*/ ctx[14].call(null, div)),
					listen(div, "paste", /*pasteContent*/ ctx[15]),
					listen(div, "blur", /*blur_handler*/ ctx[19]),
					listen(div, "mousemove", /*setMouseX*/ ctx[12]),
					listen(div, "mouseup", stop_propagation(/*mouseup_handler*/ ctx[20])),
					listen(div, "input", /*div_input_handler*/ ctx[22]),
					listen(div, "keydown", /*handleKeydown*/ ctx[11]),
					listen(div, "mouseup", /*fireSelect*/ ctx[13]),
					listen(div, "keyup", /*fireSelect*/ ctx[13])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*custom*/ 8) {
				attr(div, "data-txtcustom", /*custom*/ ctx[3]);
			}

			if (dirty[0] & /*gklass*/ 2 && div_class_value !== (div_class_value = "outline-none focus:outline-none relative " + /*gklass*/ ctx[1])) {
				attr(div, "class", div_class_value);
			}

			if (dirty[0] & /*html*/ 1 && /*html*/ ctx[0] !== div.innerHTML) {
				div.innerHTML = /*html*/ ctx[0];
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			/*div_binding*/ ctx[21](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$12(ctx) {
	let if_block_anchor;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$t;
		if (/*ish1*/ ctx[10]) return create_if_block_1$c;
		if (/*ish2*/ ctx[9]) return create_if_block_2$8;
		if (/*ish3*/ ctx[8]) return create_if_block_3$5;
		if (/*ish4*/ ctx[7]) return create_if_block_4$3;
		if (/*ish5*/ ctx[6]) return create_if_block_5$1;
		if (/*ish6*/ ctx[5]) return create_if_block_6;
		if (!/*html*/ ctx[0]) return create_if_block_7;
		return create_else_block$d;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);

			if (!mounted) {
				dispose = listen(window_1$2, "mousemove", /*triggerUpdate*/ ctx[16]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
			mounted = false;
			dispose();
		}
	};
}

let code_class$1 = 'code text-sm font-mono px-8 py-6 bg-gray-100';
let quote_class$1 = 'quote text-xl border-l-4 border-gray-800 px-4';
let reg_txt_size = /md:text\-(sm\stext-sm|base\stext-base|xl\stext-lg|2xl\stext-xl|3xl\stext-xl|4xl\stext-2xl|5xl\stext-3xl|6xl\stext-4xl)/;

// duplicated, to remove!
let g_reg_txt_size = /md:text\-(sm\stext-sm|base\stext-base|xl\stext-lg|2xl\stext-xl|3xl\stext-xl|4xl\stext-2xl|5xl\stext-3xl|6xl\stext-4xl)/;

let reg_leading = /leading\-(none|tight|snug|normal|relaxed|loose)/;
let reg_position$1 = /text\-(left|right|center)/;
let reg_padding$1 = /^p[lrtb]\-/;
let reg_margin$1 = /^m[lrtb]\-/;
let reg_txt_color = /^text\-(gray|red|yellow|green|blue|indigo|purple|pink|white|black|transparent)/;
let reg_bg_color = /^bg\-(gray|red|yellow|green|blue|indigo|purple|pink|white|black|transparent)/;
const reg_font$1 = /font\-(thin|normal|semibold|bold|black)/;
const reg_pad$1 = /p\-([0-4])/;

// let last_position
function cursorIsSame() {
	let l_cursor_change = +new Date();
	return l_cursor_change - window.cursor_change > 50;
}

function customTxtEditor(elm) {
	if (elm?.dataset?.txtcustom) {
		return elm?.dataset?.txtcustom == "true";
	}

	if (elm?.parentNode) {
		return customTxtEditor(elm.parentNode);
	}

	return false;
}

function toggleColor(arr, klass) {
	for (let elm of arr) {
		if (elm.klass) {
			let classes = elm.klass.split(' ');

			let s_color_index = classes.findIndex(c => klass.startsWith('text')
			? reg_txt_color.test(c)
			: reg_bg_color.test(c));

			let selected_color_class = ~s_color_index ? classes[s_color_index] : '';

			if (selected_color_class) {
				// remove old selected color
				elm.klass = elm.klass.replace(selected_color_class, '').trim();
			}

			elm.klass = elm.klass.split(' ').concat([klass]).join(' ');
		} else {
			elm.klass = klass;
		}
	}
}

function toggleFont(arr, klass, reg = reg_font$1) {
	for (let elm of arr) {
		if (elm.klass) {
			let classes = elm.klass.split(' ');
			let s_font_index = classes.findIndex(c => reg.test(c));
			let selected_font_class = ~s_font_index ? classes[s_font_index] : '';

			if (selected_font_class) {
				// remove old selected color
				elm.klass = elm.klass.replace(selected_font_class, '').trim();
			}

			elm.klass = elm.klass.split(' ').concat([klass]).join(' ');
		} else {
			elm.klass = klass;
		}
	}
}

function splitArr(arr, a_i, s_i, e_i) {
	let start = s_i;
	let end = e_i || arr[a_i]?.txt?.length || arr.length + 1;

	if (e_i && e_i < s_i) {
		start = e_i;
		end = s_i;
	}

	if (arr[a_i] && !arr[a_i].txt) {
		return [
			{ txt: "" },
			{
				txt: "",
				klass: arr[a_i].klass,
				tag: arr[a_i].tag,
				href: arr[a_i].href
			}
		];
	}

	let s1 = arr[a_i]?.txt.slice(0, start);
	let s2 = arr[a_i]?.txt.slice(start, end);
	let arr1 = [];
	let i = 0;

	if (s1) {
		arr1[i++] = {
			txt: s1,
			klass: arr[a_i].klass,
			tag: arr[a_i].tag,
			href: arr[a_i].href
		};
	}

	if (s2) {
		arr1[i++] = {
			txt: s2,
			klass: arr[a_i].klass,
			tag: arr[a_i].tag,
			href: arr[a_i].href
		};
	}

	if (e_i && arr[a_i]?.txt.slice(end, arr[a_i].txt.length)) {
		arr1[i++] = {
			txt: arr[a_i].txt.slice(end, arr[a_i].txt.length),
			klass: arr[a_i].klass,
			tag: arr[a_i].tag,
			href: arr[a_i].href
		};
	}

	return arr1;
}

// return last element if index is
function getIndex(node) {
	let p_node = node;
	if (!node) return -1;

	if (node.nodeName == 'DIV') {
		p_node = node.children[0];
		if (!p_node) return -1;
	} else if (['SPAN', 'A'].includes(node.parentNode.tagName)) {
		p_node = node.parentNode;
	}

	return [...p_node.parentNode.childNodes].filter(n => n.nodeName != '#text' || n.length > 0).indexOf(p_node);
}

function scaleToFit(img) {
	// get the scale
	const canvas = document.createElement('canvas');

	const ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	return canvas.toDataURL("image/webp");
}

function instance$J($$self, $$props, $$invalidate) {
	let ish1;
	let ish2;
	let ish3;
	let ish4;
	let ish5;
	let ish6;
	let dispatch = createEventDispatcher();
	let arr_elms = [];
	let { html = '' } = $$props;
	let { gklass = '' } = $$props;
	let { editable = true } = $$props;
	let { custom = false } = $$props;

	async function generateArr() {
		let div = document.createElement('div');
		div.innerHTML = html;
		let n_elms = [];

		for (let elm of [...div.childNodes]) {
			const itrue = attr => elm.hasAttribute(attr);

			if (elm.nodeName == 'BR') n_elms.push({ tag: 'BR', txt: "" }); else if (elm.nodeName == 'A') n_elms.push({
				tag: 'A',
				txt: elm.textContent,
				href: elm.getAttribute('href'),
				blank: elm.getAttribute('target') == "_blank",
				klass: elm.classList && [...elm.classList].join(' ')
			}); else if (elm.nodeName == 'IMG') n_elms.push({
				tag: 'IMG',
				txt: elm.getAttribute('alt'),
				href: elm.getAttribute('src'),
				klass: elm.classList && [...elm.classList].join(' ')
			}); else if (elm.nodeName == 'VIDEO') n_elms.push({
				tag: 'VIDEO',
				href: elm.getAttribute('src'),
				klass: elm.classList && [...elm.classList].join(' '),
				opts: {
					autoplay: itrue('autoplay'),
					loop: itrue('loop'),
					muted: itrue('muted'),
					controls: itrue('controls')
				}
			}); else if (elm.dataset?.iframe) n_elms.push({
				tag: 'IFRAME',
				href: elm.lastChild.getAttribute('src'),
				klass: elm.lastChild.classList && [...elm.lastChild.classList].join(' ')
			}); else if (elm.nodeName == 'SPAN') n_elms.push({
				txt: elm.innerText,
				klass: elm.classList && [...elm.classList].join(' ')
			}); else if (elm.nodeName !== '#text') n_elms.push({
				htxt: `${elm.outerHTML}`,
				klass: elm.classList && [...elm.classList].join(' ')
			}); else if (elm.nodeName == '#text' && elm.length > 0) n_elms.push({ txt: elm.textContent });
		}

		arr_elms = n_elms;
		await tick();
		refreshEvents();
	}

	// workaround in case using sapper!
	let mounted = false;

	onMount(() => {
		$$invalidate(17, mounted = true);
		generateArr();

		document.onselectionchange = function () {
			window.cursor_change = +new Date();
		};
	});

	const char_keys = [('B').charCodeAt(0), ('U').charCodeAt(0), ('I').charCodeAt(0)];

	async function handleKeydown(e) {
		if (e.ctrlKey && char_keys.includes(e.keyCode)) {
			e.preventDefault();
			return;
		}

		if (e.ctrlKey && e.keyCode == ('Z').charCodeAt(0)) {
			dispatch('back');
			return;
		}

		if (e.ctrlKey && e.keyCode == ('Y').charCodeAt(0)) {
			dispatch('forward');
			return;
		}

		let selection = window.getSelection();
		let b_node = selection.anchorNode;
		let e_node = selection.focusNode;
		let start_i = selection.baseOffset;
		selection.extentOffset;
		if (!b_node) return;

		let elm_node = b_node?.tagName == 'DIV'
		? b_node
		: b_node.parentNode.tagName == 'DIV'
			? b_node.parentNode
			: b_node.parentNode.parentNode;

		let ed_elm = elm_node;

		while (!ed_elm?.dataset?.txteditor && ed_elm?.tagName != 'HTML') {
			ed_elm = ed_elm.parentNode;
		}

		let b_index = getIndex(b_node);
		getIndex(e_node);

		const adjustPosition = (n, d = "up") => {
			let children = [...n.childNodes];
			let last_child = children[children.length - 1];
			if (!last_child) return;

			last_child = ['#text', 'BR', 'IMG', 'VIDEO'].includes(last_child.nodeName) || last_child?.dataset?.iframe
			? last_child
			: last_child.childNodes[0];

			if (!last_child) return false;
			let pos = d == "up" ? last_child.textContent.length : 0;

			try {
				selection.setBaseAndExtent(last_child, pos, last_child, pos);
			} catch {
				
			} // ignore!
		};

		// up key
		if (e.keyCode == 38) {
			if (b_node == e_node && start_i == 0 && b_index <= 0) {
				// move to the previous node
				let pv_elm = ed_elm.previousElementSibling;

				while (pv_elm && pv_elm.previousElementSibling && !pv_elm.isContentEditable) {
					pv_elm = pv_elm.previousElementSibling;
				}

				if (pv_elm && pv_elm.isContentEditable) {
					pv_elm.focus();
					e.preventDefault();
					adjustPosition(pv_elm, 'up');
					return false;
				}
			}
		}

		// down key
		if (e.keyCode == 40) {
			// get index
			if (b_node == e_node) {
				await new Promise(r => setTimeout(r));

				// if(b_index == arr_elms.length-1 || (b_index == arr_elms.length-2 && arr_elms[arr_elms.length-1].tag == 'BR') || b_node == elm_node){				
				if (cursorIsSame() && ed_elm.dataset.txtcustom == "true" || ed_elm.dataset.txtcustom !== "true" && b_index >= arr_elms.length - 1 || (b_index == -1 || start_i == arr_elms.length - 1) && arr_elms[arr_elms.length - 1].tag == 'BR') {
					let next_elm = ed_elm.nextElementSibling;

					while (next_elm && next_elm.nextElementSibling && !next_elm.isContentEditable) {
						next_elm = next_elm.nextElementSibling;
					}

					if (next_elm && next_elm.isContentEditable) {
						next_elm.focus();
						e.preventDefault();

						//adjustPosition(next_elm, 'down')
						return false;
					}
				}
			}
		}

		// del key
		if (e.keyCode == 46) {
			if (customTxtEditor(b_node)) {
				if (b_node?.dataset?.txteditor && !b_node?.innerHTML) {
					dispatch('merge_next', '');
				}

				return;
			}

			let elms = arr_elms.length && arr_elms[arr_elms.length - 1].tag == 'BR'
			? arr_elms.slice(0, arr_elms.length - 1)
			: arr_elms;

			if (!~b_index && !elms.length || b_node.tagName == 'DIV' && b_index == 0 && start_i == elms.length || b_index == elms.length - 1 && start_i == elms[elms.length - 1].txt?.length && !selection.toString()) {
				let l_node_index;
				let l_node_end;
				let pv_elm = elm_node;

				if (pv_elm && pv_elm.isContentEditable) {
					if (!pv_elm.childNodes.length) pv_elm.focus(); else {
						l_node_index = pv_elm.childNodes.length - 1;
						l_node_end = pv_elm.childNodes[pv_elm.childNodes.length - 1].textContent.length;
					}
				}

				dispatch('merge_next');
				e.preventDefault();
				await new Promise(r => setTimeout(r));

				if (l_node_index !== undefined) {
					let l_node = pv_elm.childNodes[l_node_index];

					if (l_node.nodeName !== '#text' && l_node.nodeName !== 'BR') {
						l_node = l_node.childNodes[0];
					}

					selection.setBaseAndExtent(l_node, l_node_end, l_node, l_node_end);
				}

				return;
			}
		}

		// back key
		if (e.keyCode == 8) {
			if (customTxtEditor(b_node)) {
				if (b_node?.dataset?.txteditor && !b_node?.innerHTML) {
					dispatch('merge_prev', '');
				}

				return;
			}

			if (start_i == 0 && (b_index == 0 || b_index == -1)) {
				let l_node_index;
				let l_node_end;
				let pv_elm = elm_node.previousElementSibling;

				// STEP to skip grammarly (woraround for now!) -- TODO - fix
				if (pv_elm && !pv_elm.isContentEditable) pv_elm = pv_elm.previousElementSibling;

				if (pv_elm && pv_elm.isContentEditable) {
					if (!pv_elm.childNodes.length) {
						pv_elm.focus();
					} else {
						l_node_index = pv_elm.childNodes.length - 1;
						l_node_end = pv_elm.childNodes[pv_elm.childNodes.length - 1].textContent.length;
					}
				}

				e.preventDefault();
				dispatch('merge_prev', html);
				await new Promise(r => setTimeout(r));

				if (l_node_index !== undefined) {
					let l_node = pv_elm.childNodes[l_node_index];

					if (l_node.nodeName !== '#text' && l_node.nodeName !== 'BR') {
						l_node = l_node.childNodes[0];
					}

					try {
						selection.setBaseAndExtent(l_node, l_node_end, l_node, l_node_end);
					} catch {
						
					} // ignore!
				}
			}
		}

		// enter key
		if (e.keyCode == 13 && e.shiftKey == false) {
			let elm_html = '';
			let next_html = '';

			let elm_index = b_index == -1
			? arr_elms.length - 1
			: b_index + (b_node.tagName == 'DIV' && start_i > 0 ? start_i - 1 : 0);

			if (customTxtEditor(b_node)) {
				e.preventDefault();

				dispatch('enter', {
					html: html.trim(),
					next_html: "",
					klass: gklass,
					target: e.currentTarget
				});

				return;
			}

			if (arr_elms.length > 0 && ~b_index) {
				let n_arr = splitArr(arr_elms, elm_index, start_i);
				arr_elms.splice(elm_index, 1, ...n_arr);
				let s_index = elm_index + (start_i == 0 ? 0 : 1);
				const hasImg = arr_elms.find(elm => elm.tag === "IMG");
				s_index = hasImg ? s_index + 1 : s_index;
				elm_html = extractHTML(arr_elms.slice(0, s_index));
				next_html = extractHTML(arr_elms.slice(s_index, arr_elms.length));
			}

			if (!~b_index) {
				elm_html = extractHTML(arr_elms);
			}

			dispatch('enter', {
				html: elm_html.trim(),
				next_html: next_html.trim(),
				klass: gklass,
				target: e.currentTarget
			});

			e.preventDefault();
			return false;
		}

		if (e.keyCode == 13 && e.shiftKey == true) {
			let div_elm = b_node.nodeName != '#text'
			? b_node.parentNode
			: b_node.parentNode.parentNode;

			await new Promise(r => setTimeout(r));

			if (customTxtEditor(div_elm)) {
				return;
			}

			// not in rooot
			if (b_node.nodeName != "DIV" && (b_node.parentNode && b_node.parentNode.tagName != 'DIV' || !['BR', '#text'].includes(b_node.nodeName))) {
				let parent = b_node.nodeName != '#text' ? b_node : b_node.parentNode;

				//div_elm = parent.parentNode ? parent.parentNode : div_elm
				if (!parent.parentNode) {
					refresh();
					await new Promise(r => setTimeout(r));
					let p_elm = div_elm.childNodes[b_index];
					selection.setBaseAndExtent(p_elm, 0, p_elm, 0);
					return;
				}

				// parent child text nodes
				let children = [...parent.childNodes];

				let elms = [];

				for (let ch of children) {
					if (ch && ch.textContent) {
						elms.push({
							txt: ch.textContent,
							klass: arr_elms[b_index]?.klass || "",
							tag: parent.tagName
						});
					} else {
						elms.push({ tag: "BR", txt: "" });
					}
				}

				arr_elms.splice(b_index, 1, ...elms);
				refresh();
				await new Promise(r => setTimeout(r));
				let p_elm = div_elm.childNodes[elms[0].tag == 'BR' ? b_index : b_index + 2];
				selection.setBaseAndExtent(p_elm, 0, p_elm, 0);
			}
		}

		if (!e.ctrlKey && !e.shiftKey && !e.altKey) dispatch('input', e);
	}

	function extractHTML(arr) {
		let str = '';

		arr.forEach(elm => {
			let elm_txt = elm.txt;

			if (elm.txt) {
				elm_txt = elm.txt.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
			}

			if (elm.htxt) {
				str += elm.htxt;
			} else if (elm.tag == 'BR') {
				str += '<br>';
			} else if (elm.tag == 'A') {
				str += `<a href=${elm.href} target=${elm.blank ? '_blank' : '_self'} class="${elm.klass}">${elm_txt}</a>`;
			} else if (elm.tag == 'IMG') {
				str += `<img src=${elm.href} class="${elm.klass}" alt="${elm_txt}" />`;
			} else if (elm.tag == 'VIDEO') {
				str += `<video src=${elm.href} class="${elm.klass}" ${!!elm.opts?.loop ? 'loop' : ''} ${!!elm.opts?.autoplay ? 'autoplay' : ''} ${!!elm.opts?.muted ? 'muted' : ''} ${!!elm.opts?.controls ? 'controls' : ''} />`;
			} else if (elm.tag == 'IFRAME') {
				let ed_str = "";

				if (editable) {
					ed_str = `<div class="p-1 text-xs w-32 bg-yellow-200 text-yellow-800 cursor-pointer underline text-center">
						Edit iframe
					</div>`;
				}

				str += `<div class="iframe-wrap" data-iframe="true" contenteditable="false">
					${ed_str}
					<iframe src=${elm.href} class="${elm.klass}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
				</div>`;
			} else if (elm.klass) {
				str += `<span class="${elm.klass}">${elm_txt}</span>`;
			} else {
				str += elm_txt;
			}
		});

		return str;
	}

	function refresh() {
		$$invalidate(0, html = extractHTML(arr_elms));
	}

	let l_edit_state = editable;

	function refreshEvents() {
		if (!edit_node) return;

		[...edit_node.childNodes].forEach((ch, i) => {
			if (['IMG', 'VIDEO'].includes(ch.nodeName) || ch.classList?.contains('iframe-wrap')) {
				ch.addEventListener('click', e => editMedia(e.currentTarget, i));
			}
		});
	}

	let h_selection = null;

	async function holdSelection(selection) {
		if (h_selection) return;

		h_selection = {
			start_i: selection.baseOffset,
			end_i: selection.extentOffset,
			b_node: selection.anchorNode,
			e_node: selection.focusNode
		};
	}

	async function setClass(class_name, link, opts = {}) {
		arr_elms.forEach(e => delete e.selected);
		let selection = window.getSelection();
		selection.toString();
		let start_i = h_selection ? h_selection.start_i : selection.baseOffset;
		let end_i = h_selection ? h_selection.end_i : selection.extentOffset;
		let b_node = h_selection ? h_selection.b_node : selection.anchorNode;
		let e_node = h_selection ? h_selection.e_node : selection.focusNode;
		let b_index = getIndex(b_node);
		let e_index = getIndex(e_node);
		let same_node = b_node == e_node;
		let reverse = b_index > e_index;
		let sb_index = b_index;
		let se_index = e_index;

		if (reverse) {
			sb_index = e_index;
			se_index = b_index;
			let x = start_i;
			start_i = end_i;
			end_i = x;
		}

		let edit_node = b_node.parentNode;

		if (b_node.parentNode.tagName !== 'DIV') {
			edit_node = edit_node.parentNode;
		}

		let n_arr = arr_elms.slice(sb_index, se_index + 1);
		let arr1 = splitArr(n_arr, 0, start_i, same_node && end_i);

		let up_arr = arr1.length == 1
		? arr1
		: arr1.length == 2 && (start_i == 0 || end_i == 0)
			? [arr1[0]]
			: [arr1[1]];

		n_arr.splice(0, 1, ...arr1);
		let arr2 = [];

		if (!same_node) {
			arr2 = splitArr(n_arr, n_arr.length - 1, end_i, false);
			n_arr.splice(n_arr.length - 1, 1, ...arr2);
			up_arr = up_arr.concat(n_arr.slice(1, n_arr.length - (arr2.length == 1 ? 0 : 1)));
		}

		toggleClass(up_arr, class_name, link, opts);
		up_arr.forEach(e => e.selected = true);
		arr_elms.splice(sb_index, se_index - sb_index + 1, ...n_arr);
		let p_selector = {};
		mergeArr(p_selector);
		refresh();
		h_selection = null;
		await tick();
		let ch_nodes = [...edit_node.childNodes].filter(elm => elm.nodeName !== '#text' || elm.nodeName == '#text' && elm.length > 0);
		let start_node = ch_nodes[p_selector.a_start];
		let end_node = ch_nodes[p_selector.a_end];

		start_node = start_node.nodeName == '#text'
		? start_node
		: start_node.firstChild;

		end_node = end_node.nodeName == '#text'
		? end_node
		: end_node.firstChild;

		await new Promise(r => setTimeout(r));
		window.getSelection().removeAllRanges();
		window.getSelection().setBaseAndExtent(start_node, p_selector.s_start, end_node, p_selector.s_end);
		holdSelection(window.getSelection());
	}

	async function setGClass(klass) {
		if (klass) {
			if (reg_txt_size.test(klass)) {
				$$invalidate(1, gklass = gklass.replace(code_class$1, '').replace(quote_class$1, '').trim());
				replaceGClass(klass, reg_txt_size);
			} else if (klass.startsWith('code')) {
				if (!gklass.includes(code_class$1)) {
					$$invalidate(1, gklass = gklass.replace(quote_class$1, '').replace(g_reg_txt_size, '').trim());
					$$invalidate(1, gklass += ' ' + code_class$1);
				}
			} else if (klass.startsWith('quote')) {
				if (!gklass.includes(quote_class$1)) {
					$$invalidate(1, gklass = gklass.replace(code_class$1, '').replace(g_reg_txt_size, '').trim());
					$$invalidate(1, gklass += ' ' + quote_class$1);
				}
			} else if (reg_padding$1.test(klass)) {
				let reg_padd = new RegExp(`p${klass[1]}-[^\\s]+`);
				replaceGClass(klass, reg_padd);
			} else if (reg_margin$1.test(klass)) {
				let reg_mar = new RegExp(`m${klass[1]}-[^\\s]+`);
				replaceGClass(klass, reg_mar);
			} else if (reg_position$1.test(klass)) {
				replaceGClass(klass, reg_position$1);
			} else if (reg_leading.test(klass)) {
				replaceGClass(klass, reg_leading);
			} else {
				toggleGClass(klass);
			}
		} else {
			elm.klass = klass;
		}

		dispatch('changeClass');
	}

	function mergeArr(p_selector) {
		let n_arr = [{ ...arr_elms[0] }];

		if (arr_elms[0].selected) {
			p_selector.s_start = 0;
			p_selector.a_start = 0;
			p_selector.s_end = arr_elms[0].txt.length;
			p_selector.a_end = 0;
		}

		for (let i = 1; i < arr_elms.length; i++) {
			if (arr_elms[i].txt && arr_elms[i].tag == arr_elms[i - 1].tag && arr_elms[i].klass == arr_elms[i - 1].klass) {
				if (arr_elms[i].selected && !arr_elms[i - 1].selected) {
					p_selector.s_start = n_arr[n_arr.length - 1].txt.length;
					p_selector.a_start = n_arr.length - 1;
					p_selector.s_end = n_arr[n_arr.length - 1].txt.length + arr_elms[i].txt.length;
					p_selector.a_end = n_arr.length - 1;
				}

				n_arr[n_arr.length - 1].txt += arr_elms[i].txt;
			} else {
				if (arr_elms[i].txt) {
					n_arr.push({ ...arr_elms[i] });

					if (arr_elms[i].selected && !arr_elms[i - 1].selected) {
						p_selector.s_start = 0;
						p_selector.a_start = n_arr.length - 1;
						p_selector.s_end = n_arr[n_arr.length - 1].txt.length;
						p_selector.a_end = n_arr.length - 1;
					}
				} else if (arr_elms[i].tag == 'BR') {
					n_arr.push({ ...arr_elms[i] });
				}
			}

			if (arr_elms[i].selected && arr_elms[i - 1].selected) {
				p_selector.s_end = n_arr[n_arr.length - 1].txt.length;
				p_selector.a_end = n_arr.length - 1;
			}
		}

		arr_elms = n_arr;
	}

	function toggleGClass(klass) {
		if (gklass.includes(klass)) {
			$$invalidate(1, gklass = gklass.replace(klass, '').trim());
		} else {
			$$invalidate(1, gklass = gklass.split(' ').concat([klass]).join(' '));
		}
	}

	function replaceGClass(klass, reg) {
		$$invalidate(1, gklass = gklass.replace(reg, '').replace(/\s+/, ' ').trim());
		$$invalidate(1, gklass = gklass + ' ' + klass);
	}

	function toggleClass(arr, klass, link, opts = {}) {
		if (reg_txt_color.test(klass) || reg_bg_color.test(klass)) {
			toggleColor(arr, klass);
			dispatch('changeClass');
			return;
		}

		if (reg_font$1.test(klass)) {
			toggleFont(arr, klass, reg_font$1);
			dispatch('changeClass');
			return;
		}

		if (reg_pad$1.test(klass)) {
			toggleFont(arr, klass, reg_pad$1);
			dispatch('changeClass');
			return;
		}

		if (arr.find(e => e.tag != 'BR' && (!e.klass || !e.klass.includes(klass)))) {
			for (let elm of arr) {
				if (elm.tag != 'BR' && link) {
					elm.tag = 'A';
					elm.href = link;
					elm.blank = !!opts.blank;
				}

				if (!elm.klass || !elm.klass.includes(klass)) {
					elm.klass = elm.klass
					? elm.klass.split(' ').concat([klass]).join(' ')
					: klass;

					elm.tag = elm.tag;
				}
			}
		} else {
			for (let elm of arr) {
				if (elm.tag != "BR" && link) {
					elm.tag = 'A';
					elm.href = link;
					elm.blank = !!opts.blank;
				}

				if (link === null && elm.tag != 'IMG' && elm.klass && elm.klass.includes('link')) {
					delete elm.href;
					delete elm.tag;
				}

				if (!link) elm.klass = (elm.klass || '') && elm.klass.replace(klass, '').trim();
				if (elm.klass == '') delete elm.klass;
			}
		}

		dispatch('changeClass');
	}

	// EVENT FN
	function extractClasses(b_index, e_index) {
		if (b_index > e_index) {
			let x = b_index;
			b_index = e_index;
			e_index = x;
		}

		let arr_slice = arr_elms.slice(b_index, e_index + 1);
		if (!arr_slice[0] || !arr_slice[0].klass) return '';
		let b_class = arr_slice[0].klass;

		// find similar classes
		let arr_classes = b_class.split(' ');

		// if word not found remove it
		for (let i = 1; i < arr_slice.length; i++) {
			// get all the common classes!
			let elm = arr_slice[i];

			for (let w_class of arr_classes) {
				if (elm.klass && !elm.klass.includes(w_class)) {
					b_class = b_class.replace(w_class, '').trim();
				}
			}
		}

		return b_class;
	}

	function extractLink(b_index, e_index) {
		if (b_index > e_index) {
			let x = b_index;
			b_index = e_index;
			e_index = x;
		}

		let arr_slice = arr_elms.slice(b_index, e_index + 1);
		let href = '';
		let blank = true;

		for (let i = 0; i < arr_slice.length; i++) {
			// get all the common classes!
			let elm = arr_slice[i];

			if (elm.href) {
				href = elm.href;
				blank = elm.blank;
				break;
			}
		}

		return { href, blank };
	}

	// this sets gklass for the float, since float need to be applied for the parent
	function setClasses(media) {
		// let zmatch = media.klass.match(/z-\d+/)
		// let z = zmatch?.[0] || ""
		// let floatmatch = media.klass.match(/float-\w+/)
		// let float = floatmatch?.[0] || ""
		// gklass = gklass.replace(/z-\d+/,'')
		// gklass = gklass.replace(/float-\w+/,'')
		// gklass += ` ${z} ${float} `
		const fclass = "flex items-start";

		const fclassRev = "flex justify-end items-start";
		const fclassCenter = "flex justify-center items-start";
		$$invalidate(1, gklass = gklass.replace(/flex.+start/, ''));
		console.log("GKLASS --> ", gklass);

		if (media.klass.includes(fclass)) {
			$$invalidate(1, gklass += " " + fclass);
		}

		if (media.klass.includes(fclassRev)) {
			$$invalidate(1, gklass += " " + fclassRev);
		}

		if (media.klass.includes(fclassCenter)) {
			$$invalidate(1, gklass += " " + fclassCenter);
		}

		$$invalidate(1, gklass = gklass.replace(/\s+/g, ' ').trim());
	} // media.klass = media.klass.replace(/z-\d+/,'').replace(/float-\w+/,'')

	// embed image or video!
	async function embedElement(e, b_node, b_index) {
		//TODO key code is not up/down/left/right
		let src = b_node.textContent.split(' ').pop();

		if (src && src.startsWith('https')) {
			let is_img = await Util.testImgUrl(src.trim());
			let is_video = Util.testVideoUrl(src.trim());
			let iframe_vid = Util.parseYouTube(src.trim()) || Util.parseVimeo(src.trim());

			if (is_img || is_video || iframe_vid) {
				dispatch('set_media', {
					setMedia: img => {
						setClasses(img);
						if (is_img) setImg(img.klass, img.alt, src, b_index); else if (is_video) setVideo(img.klass, img.opts, src, b_index); else if (iframe_vid) setIframe(img.klass, iframe_vid, b_index);
					},
					media_type: is_img
					? 'IMG'
					: is_video ? 'VIDEO' : iframe_vid ? 'IFRAME' : 'AUDIO',
					base_node: b_node,
					src: iframe_vid || src,
					delMedia: () => delElm(b_index),
					mouseX
				});
			}
		}
	}

	function editMedia(b_node, i) {
		let elm = arr_elms[i];
		let extra = { alt: elm?.txt || '' };
		if (b_node.tagName == "VIDEO") extra = { opts: elm?.opts || {} };

		// if(b_node.classList?.contains('iframe-wrap')){
		// 	b_node = b_node.lastChild
		// }
		dispatch('set_media', {
			setMedia: img => {
				if (!img.src) return;
				setClasses(img);

				if (img.media_type == "VIDEO") {
					setVideo(img.klass, img.opts, img.src, i);
				} else if (img.media_type == "IMG") {
					setImg(img.klass, img.alt, img.src, i);
				} else if (img.media_type == "IFRAME") {
					setIframe(img.klass, img.src, i);
				}
			},
			base_node: b_node,
			media_type: b_node.tagName,
			src: elm?.href || '',
			klass: elm?.klass || '',
			...extra,
			delMedia: () => delElm(i),
			mouseX
		});
	}

	function delElm(b_index) {
		arr_elms.splice(b_index, 1);
		refresh();
	}

	function setImg(klass, alt, src, b_index) {
		arr_elms[b_index] = { tag: 'IMG', href: src, txt: alt, klass };
		refresh();
	}

	function setVideo(klass, opts, src, b_index) {
		arr_elms[b_index] = { tag: 'VIDEO', href: src, opts, klass };
		refresh();
	}

	function setIframe(klass, src, b_index) {
		arr_elms[b_index] = { tag: 'IFRAME', href: src, klass };
		refresh();
	}

	let mouseX;

	function setMouseX(e) {
		mouseX = e.clientX;
	}

	function fireSelect(e) {
		let selection = window.getSelection();
		let selection_txt = selection.toString();
		let b_node = selection.anchorNode;
		let e_node = selection.focusNode;
		let b_index = getIndex(b_node);
		let e_index = getIndex(e_node);
		if (!b_node?.nodeName) return;

		if (b_node.nodeName == 'DIV' || e_node.nodeName == 'DIV') {
			hideSelect();
			return;
		}

		h_selection = null;

		if (selection_txt) {
			holdSelection(selection);

			// extract classes to pass them to the toolbar!
			let classes = extractClasses(b_index, e_index);

			let { href, blank } = extractLink(b_index, e_index);

			if (customTxtEditor(b_node)) {
				return;
			}

			dispatch('select', {
				setClass,
				setGClass,
				base_node: b_node,
				classes,
				g_classes: gklass,
				href,
				blank,
				mouseX
			});
		} else {
			embedElement(e, b_node, b_index);
			hideSelect();
		}
	}

	function hideSelect() {
		dispatch('hideselect');
	}

	let edit_node;

	function setEditorNode(node) {
		edit_node = node;
	}

	function pasteImg(blob) {
		return new Promise(resolve => {
				if (blob !== null) {
					let reader = new FileReader();

					reader.onload = function (event) {
						const imgUrl = event.target.result;
						const img = new Image();
						img.src = imgUrl;

						img.onload = () => {
							let dataUrl = scaleToFit(img);
							$$invalidate(0, html = html.replace(imgUrl, dataUrl));
						};

						resolve(event.target.result);
					};

					reader.readAsDataURL(blob);
				} else {
					resolve();
				}
			});
	}

	function pasteContent(event) {
		const items = (event.clipboardData || event.originalEvent.clipboardData).items;
		let blob = null;

		for (let i = 0; i < items.length; i++) {
			if (items[i].type.indexOf("image") === 0) {
				blob = items[i].getAsFile();
			}
		}

		if (blob !== null) {
			pasteImg(blob);
		} else {
			let src = event.path?.[0];

			// skib generated br
			if (src.tagName == "BR") {
				src = event.path?.[1];
			}

			if (html.trim()) {
				let clipboardData = event.clipboardData || window.clipboardData;
				let txt = clipboardData.getData('text');
				event.preventDefault();
				const selection = window.getSelection();
				if (!selection.rangeCount) return false;
				selection.deleteFromDocument();
				selection.getRangeAt(0).insertNode(document.createTextNode(txt));
				$$invalidate(0, html = contentEditorNode.innerHTML);
				generateArr();
				refresh();
				dispatch('input');
			} else {
				dispatch('pasteTxt', src);
			}

			// dispatch('pasteTxt', event.srcElement)
			event.stopPropagation();
		}
	}

	function triggerUpdate() {
		dispatch('update');
	}

	let contentEditorNode;

	function blur_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseup_handler(event) {
		bubble.call(this, $$self, event);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			contentEditorNode = $$value;
			$$invalidate(4, contentEditorNode);
		});
	}

	function div_input_handler() {
		html = this.innerHTML;
		$$invalidate(0, html);
	}

	$$self.$$set = $$props => {
		if ('html' in $$props) $$invalidate(0, html = $$props.html);
		if ('gklass' in $$props) $$invalidate(1, gklass = $$props.gklass);
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('custom' in $$props) $$invalidate(3, custom = $$props.custom);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*mounted, html*/ 131073) {
			if (mounted) {
				if (html) generateArr(); else arr_elms = [];
			}
		}

		if ($$self.$$.dirty[0] & /*editable*/ 4) {
			if (editable) {
				setTimeout(refreshEvents);
			}
		}

		if ($$self.$$.dirty[0] & /*l_edit_state, editable*/ 262148) {
			if (l_edit_state != editable) {
				$$invalidate(18, l_edit_state = editable);
				refresh();
			}
		}

		if ($$self.$$.dirty[0] & /*gklass*/ 2) {
			$$invalidate(10, ish1 = gklass.includes('text-6xl'));
		}

		if ($$self.$$.dirty[0] & /*gklass*/ 2) {
			$$invalidate(9, ish2 = gklass.includes('text-5xl'));
		}

		if ($$self.$$.dirty[0] & /*gklass*/ 2) {
			$$invalidate(8, ish3 = gklass.includes('text-4xl'));
		}

		if ($$self.$$.dirty[0] & /*gklass*/ 2) {
			$$invalidate(7, ish4 = gklass.includes('text-3xl'));
		}

		if ($$self.$$.dirty[0] & /*gklass*/ 2) {
			$$invalidate(6, ish5 = gklass.includes('text-2xl'));
		}

		if ($$self.$$.dirty[0] & /*gklass*/ 2) {
			$$invalidate(5, ish6 = gklass.includes('text-xl'));
		}
	};

	return [
		html,
		gklass,
		editable,
		custom,
		contentEditorNode,
		ish6,
		ish5,
		ish4,
		ish3,
		ish2,
		ish1,
		handleKeydown,
		setMouseX,
		fireSelect,
		setEditorNode,
		pasteContent,
		triggerUpdate,
		mounted,
		l_edit_state,
		blur_handler,
		mouseup_handler,
		div_binding,
		div_input_handler
	];
}

class ContentEditor extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$J,
			create_fragment$12,
			safe_not_equal,
			{
				html: 0,
				gklass: 1,
				editable: 2,
				custom: 3
			},
			null,
			[-1, -1]
		);
	}
}

/* ../tailwind-editor/src/Icons/NoColor.svelte generated by Svelte v3.55.0 */

function create_fragment$11(ctx) {
	let svg;
	let path0;
	let path1;

	return {
		c() {
			svg = svg_element("svg");
			path0 = svg_element("path");
			path1 = svg_element("path");
			attr(path0, "d", "M8.46457 14.1213C8.07404 14.5118 8.07404 15.145 8.46457 15.5355C8.85509 15.926 9.48825 15.926 9.87878 15.5355L15.5356 9.87862C15.9262 9.4881 15.9262 8.85493 15.5356 8.46441C15.1451 8.07388 14.5119 8.07388 14.1214 8.46441L8.46457 14.1213Z");
			attr(path0, "fill", "currentColor");
			attr(path1, "fill-rule", "evenodd");
			attr(path1, "clip-rule", "evenodd");
			attr(path1, "d", "M6.34315 17.6569C9.46734 20.781 14.5327 20.781 17.6569 17.6569C20.781 14.5327 20.781 9.46734 17.6569 6.34315C14.5327 3.21895 9.46734 3.21895 6.34315 6.34315C3.21895 9.46734 3.21895 14.5327 6.34315 17.6569ZM16.2426 16.2426C13.8995 18.5858 10.1005 18.5858 7.75736 16.2426C5.41421 13.8995 5.41421 10.1005 7.75736 7.75736C10.1005 5.41421 13.8995 5.41421 16.2426 7.75736C18.5858 10.1005 18.5858 13.8995 16.2426 16.2426Z");
			attr(path1, "fill", "currentColor");
			attr(svg, "class", "w-4 h-4 text-red-700 fill-current");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path0);
			append(svg, path1);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class NoColor extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$11, safe_not_equal, {});
	}
}

/* ../tailwind-editor/src/ToolBar/ColorList.svelte generated by Svelte v3.55.0 */

function get_each_context$b(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

function get_each_context_1$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

// (33:4) {#each colors as color}
function create_each_block_1$6(ctx) {
	let div;
	let mounted;
	let dispose;

	function click_handler_3(...args) {
		return /*click_handler_3*/ ctx[6](/*color*/ ctx[11], /*i*/ ctx[10], ...args);
	}

	return {
		c() {
			div = element("div");
			attr(div, "class", "bg-" + /*color*/ ctx[11] + "-" + (/*i*/ ctx[10] + 1) * 100 + " w-5 h-5 cursor-pointer");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(div, "click", click_handler_3);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (31:2) {#each (new Array(8)) as num,i}
function create_each_block$b(ctx) {
	let div;
	let t;
	let each_value_1 = /*colors*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$6(get_each_context_1$6(ctx, each_value_1, i));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			attr(div, "class", "flex");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*colors, selectColor*/ 3) {
				each_value_1 = /*colors*/ ctx[0];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$6(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$6(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, t);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

function create_fragment$10(ctx) {
	let div5;
	let div4;
	let div3;
	let div0;
	let t0;
	let div1;
	let t1;
	let div2;
	let nocolor;
	let t2;
	let current;
	let mounted;
	let dispose;
	nocolor = new NoColor({});
	let each_value = new Array(8);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$b(get_each_context$b(ctx, each_value, i));
	}

	return {
		c() {
			div5 = element("div");
			div4 = element("div");
			div3 = element("div");
			div0 = element("div");
			t0 = space();
			div1 = element("div");
			t1 = space();
			div2 = element("div");
			create_component(nocolor.$$.fragment);
			t2 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "bg-black w-5 h-5 cursor-pointer");
			attr(div1, "class", "bg-white border border-gray-400 w-5 h-5 cursor-pointer");
			attr(div2, "class", "bg-white border-t border-b border-r border-gray-400 w-5 h-5 flex items-center justify-center cursor-pointer");
			attr(div3, "class", "flex items-center");
			attr(div4, "class", "shadow-xl border border-gray-200");
			attr(div5, "class", "flex");
		},
		m(target, anchor) {
			insert(target, div5, anchor);
			append(div5, div4);
			append(div4, div3);
			append(div3, div0);
			append(div3, t0);
			append(div3, div1);
			append(div3, t1);
			append(div3, div2);
			mount_component(nocolor, div2, null);
			append(div4, t2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div4, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(div0, "click", /*click_handler*/ ctx[3]),
					listen(div1, "click", /*click_handler_1*/ ctx[4]),
					listen(div2, "click", /*click_handler_2*/ ctx[5])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*colors, selectColor*/ 3) {
				each_value = new Array(8);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$b(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$b(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div4, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i(local) {
			if (current) return;
			transition_in(nocolor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(nocolor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div5);
			destroy_component(nocolor);
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$I($$self, $$props, $$invalidate) {
	let dispatch = createEventDispatcher();
	let { selected_color = '' } = $$props;
	let colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];

	function selectColor(e, color) {
		$$invalidate(2, selected_color = color);
		dispatch('select', color);
		e.preventDefault();
		e.stopPropagation();
	}

	const click_handler = e => selectColor(e, `black`);
	const click_handler_1 = e => selectColor(e, `white`);
	const click_handler_2 = e => selectColor(e, `transparent`);
	const click_handler_3 = (color, i, e) => selectColor(e, `${color}-${(i + 1) * 100}`);

	$$self.$$set = $$props => {
		if ('selected_color' in $$props) $$invalidate(2, selected_color = $$props.selected_color);
	};

	return [
		colors,
		selectColor,
		selected_color,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3
	];
}

class ColorList extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$I, create_fragment$10, safe_not_equal, { selected_color: 2 });
	}
}

/* ../tailwind-editor/src/Icons/DownIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$$(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z");
			attr(path, "fill", "currentColor");
			attr(svg, "class", "w-4 h-4 text-gray-700");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class DownIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$$, safe_not_equal, {});
	}
}

/* ../tailwind-editor/src/ToolBar/ColorPicker.svelte generated by Svelte v3.55.0 */

const { window: window_1$1 } = globals;

function create_if_block$s(ctx) {
	let div;
	let colorlist;
	let div_class_value;
	let current;

	colorlist = new ColorList({
			props: {
				selected_color: /*selected_color*/ ctx[3]
			}
		});

	colorlist.$on("select", /*selectColor*/ ctx[5]);

	return {
		c() {
			div = element("div");
			create_component(colorlist.$$.fragment);
			attr(div, "class", div_class_value = "absolute left-0 " + /*posKlass*/ ctx[4] + " z-20 z-920 bg-white");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(colorlist, div, null);
			/*div_binding*/ ctx[10](div);
			current = true;
		},
		p(ctx, dirty) {
			const colorlist_changes = {};
			if (dirty & /*selected_color*/ 8) colorlist_changes.selected_color = /*selected_color*/ ctx[3];
			colorlist.$set(colorlist_changes);

			if (!current || dirty & /*posKlass*/ 16 && div_class_value !== (div_class_value = "absolute left-0 " + /*posKlass*/ ctx[4] + " z-20 z-920 bg-white")) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(colorlist.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(colorlist.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(colorlist);
			/*div_binding*/ ctx[10](null);
		}
	};
}

function create_fragment$_(ctx) {
	let div1;
	let div0;
	let span;
	let t1;
	let downicon;
	let div0_class_value;
	let t2;
	let current;
	let mounted;
	let dispose;
	downicon = new DownIcon({});
	let if_block = /*show_colors*/ ctx[2] && create_if_block$s(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			span = element("span");
			span.textContent = "A";
			t1 = space();
			create_component(downicon.$$.fragment);
			t2 = space();
			if (if_block) if_block.c();
			attr(span, "class", "");
			attr(div0, "class", div0_class_value = "font-medium flex items-center cursor-pointer " + /*txt*/ ctx[0] + "-" + /*selected_color*/ ctx[3] + " px-1");
			attr(div1, "class", "flex relative");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, span);
			append(div0, t1);
			mount_component(downicon, div0, null);
			append(div1, t2);
			if (if_block) if_block.m(div1, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(window_1$1, "click", /*hideColors*/ ctx[7]),
					listen(div0, "click", /*showColors*/ ctx[6])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*txt, selected_color*/ 9 && div0_class_value !== (div0_class_value = "font-medium flex items-center cursor-pointer " + /*txt*/ ctx[0] + "-" + /*selected_color*/ ctx[3] + " px-1")) {
				attr(div0, "class", div0_class_value);
			}

			if (/*show_colors*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*show_colors*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$s(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div1, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(downicon.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(downicon.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(downicon);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$H($$self, $$props, $$invalidate) {
	let posKlass;
	let { txt = 'text' } = $$props;
	let { setClass } = $$props;
	let { klass } = $$props;
	let lNode;
	let colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
	let show_colors = false;
	let selected_color = 'blue-500';

	function selectColor(evt) {
		setClass(txt + "-" + evt.detail);
		$$invalidate(3, selected_color = evt.detail);
	}

	function showColors(e) {
		$$invalidate(2, show_colors = !show_colors);
		e.stopPropagation();
		e.preventDefault();
	}

	function hideColors() {
		$$invalidate(2, show_colors = false);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			lNode = $$value;
			$$invalidate(1, lNode);
		});
	}

	$$self.$$set = $$props => {
		if ('txt' in $$props) $$invalidate(0, txt = $$props.txt);
		if ('setClass' in $$props) $$invalidate(8, setClass = $$props.setClass);
		if ('klass' in $$props) $$invalidate(9, klass = $$props.klass);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*lNode*/ 2) {
			$$invalidate(4, posKlass = lNode?.getBoundingClientRect()?.bottom > window.innerHeight
			? 'bottom-0 mb-8'
			: 'mt-8 top-0');
		}

		if ($$self.$$.dirty & /*klass, txt*/ 513) {
			if (klass) {
				let classes = klass.split(' ');
				let reg = new RegExp(txt + '\\-(' + colors.join('|') + ')');
				let s_color_index = classes.findIndex(c => reg.test(c));

				$$invalidate(3, selected_color = ~s_color_index
				? classes[s_color_index].replace(txt + '-', '')
				: '');
			}
		}
	};

	return [
		txt,
		lNode,
		show_colors,
		selected_color,
		posKlass,
		selectColor,
		showColors,
		hideColors,
		setClass,
		klass,
		div_binding
	];
}

class ColorPicker extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$H, create_fragment$_, safe_not_equal, { txt: 0, setClass: 8, klass: 9 });
	}
}

/* ../tailwind-editor/src/Icons/CodeIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$Z(ctx) {
	let svg;
	let path0;
	let path1;

	return {
		c() {
			svg = svg_element("svg");
			path0 = svg_element("path");
			path1 = svg_element("path");
			attr(path0, "d", "M9.95263 16.9123L8.59323 18.3608L2.03082 12.2016L8.18994 5.63922L9.64826 7.00791L4.85783 12.112L9.95212 16.8932L9.95263 16.9123Z");
			attr(path0, "fill", "currentColor");
			attr(path1, "d", "M14.0474 16.9123L15.4068 18.3608L21.9692 12.2016L15.8101 5.63922L14.3517 7.00791L19.1422 12.112L14.0479 16.8932L14.0474 16.9123Z");
			attr(path1, "fill", "currentColor");
			attr(svg, "class", "w-4 h-4");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path0);
			append(svg, path1);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class CodeIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$Z, safe_not_equal, {});
	}
}

/* ../tailwind-editor/src/ToolBar/LinkInput.svelte generated by Svelte v3.55.0 */

function create_if_block$r(ctx) {
	let div;
	let input0;
	let t0;
	let button0;
	let t2;
	let button1;
	let t4;
	let label;
	let input1;
	let t5;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input0 = element("input");
			t0 = space();
			button0 = element("button");
			button0.textContent = "Link";
			t2 = space();
			button1 = element("button");
			button1.textContent = "Unlink";
			t4 = space();
			label = element("label");
			input1 = element("input");
			t5 = text("\n        _Blank");
			attr(input0, "type", "text");
			attr(input0, "placeholder", "Past your link, such as http://fouita.com");
			attr(input0, "class", "bg-gray-100 border p-1 w-64 rounded outline-none shadow-inner");
			attr(button0, "class", "ml-2 hover:bg-gray-300 px-3 rounded outline-none");
			attr(button1, "class", "hover:bg-gray-300 px-3 rounded outline-none");
			attr(input1, "type", "checkbox");
			attr(input1, "class", "mr-2");
			attr(label, "class", "flex items-center text-black text-xs");
			attr(div, "class", "absolute p-3 shadow-xl flex rounded bg-white -ml-24 mt-1 z-920 z-20");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input0);
			set_input_value(input0, /*href*/ ctx[0]);
			append(div, t0);
			append(div, button0);
			append(div, t2);
			append(div, button1);
			append(div, t4);
			append(div, label);
			append(label, input1);
			input1.checked = /*blank*/ ctx[1];
			append(label, t5);

			if (!mounted) {
				dispose = [
					listen(input0, "click", stop),
					listen(input0, "focus", stop),
					listen(input0, "input", /*input0_input_handler*/ ctx[10]),
					listen(button0, "click", /*addLink*/ ctx[5]),
					listen(button1, "click", /*rmLink*/ ctx[6]),
					listen(input1, "change", /*input1_change_handler*/ ctx[11]),
					listen(label, "click", stop_propagation(/*click_handler*/ ctx[9])),
					listen(div, "click", stop)
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*href*/ 1 && input0.value !== /*href*/ ctx[0]) {
				set_input_value(input0, /*href*/ ctx[0]);
			}

			if (dirty & /*blank*/ 2) {
				input1.checked = /*blank*/ ctx[1];
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$Y(ctx) {
	let div;
	let span1;
	let t1;
	let mounted;
	let dispose;
	let if_block = /*show_link*/ ctx[2] && create_if_block$r(ctx);

	return {
		c() {
			div = element("div");
			span1 = element("span");
			span1.innerHTML = `<span class="border-b border-gray-400">Link</span>`;
			t1 = space();
			if (if_block) if_block.c();
			attr(span1, "class", "px-2 py-1");
			attr(div, "class", "relative");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span1);
			append(div, t1);
			if (if_block) if_block.m(div, null);

			if (!mounted) {
				dispose = [
					listen(window, "click", /*hideLink*/ ctx[4]),
					listen(span1, "click", /*toggleLink*/ ctx[3]),
					listen(div, "mousedown", /*mousedown_handler*/ ctx[8])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*show_link*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$r(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function stop(e) {
	e.preventDefault();
	e.stopPropagation();
	return false;
}

function instance$G($$self, $$props, $$invalidate) {
	let { href } = $$props;
	let { blank = true } = $$props;
	let show_link = false;
	let { setLink } = $$props;

	function toggleLink(e) {
		$$invalidate(2, show_link = !show_link);
		stop(e);
	}

	function hideLink() {
		$$invalidate(2, show_link = false);
	}

	function addLink() {
		setLink(`link`, href, { blank });
		hideLink();
	}

	function rmLink() {
		setLink("link", null);
		hideLink();
	}

	function mousedown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function input0_input_handler() {
		href = this.value;
		$$invalidate(0, href);
	}

	function input1_change_handler() {
		blank = this.checked;
		$$invalidate(1, blank);
	}

	$$self.$$set = $$props => {
		if ('href' in $$props) $$invalidate(0, href = $$props.href);
		if ('blank' in $$props) $$invalidate(1, blank = $$props.blank);
		if ('setLink' in $$props) $$invalidate(7, setLink = $$props.setLink);
	};

	return [
		href,
		blank,
		show_link,
		toggleLink,
		hideLink,
		addLink,
		rmLink,
		setLink,
		mousedown_handler,
		click_handler,
		input0_input_handler,
		input1_change_handler
	];
}

class LinkInput extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$G, create_fragment$Y, safe_not_equal, { href: 0, blank: 1, setLink: 7 });
	}
}

/* ../tailwind-editor/src/Icons/JustifyIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$X(ctx) {
	let svg;
	let path0;
	let path1;
	let path2;
	let path3;

	return {
		c() {
			svg = svg_element("svg");
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			attr(path0, "d", "M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4Z");
			attr(path0, "fill", "currentColor");
			attr(path1, "d", "M4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4Z");
			attr(path1, "fill", "currentColor");
			attr(path2, "d", "M3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14Z");
			attr(path2, "fill", "currentColor");
			attr(path3, "d", "M4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H4Z");
			attr(path3, "fill", "currentColor");
			attr(svg, "class", "w-5 h-5");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path0);
			append(svg, path1);
			append(svg, path2);
			append(svg, path3);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class JustifyIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$X, safe_not_equal, {});
	}
}

/* ../tailwind-editor/src/Icons/CheckIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$W(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z");
			attr(path, "fill", "currentColor");
			attr(svg, "class", "w-4 h-4 text-gray-700");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class CheckIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$W, safe_not_equal, {});
	}
}

/* ../tailwind-editor/src/ToolBar/List.svelte generated by Svelte v3.55.0 */

function get_each_context$a(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[5] = list[i];
	return child_ctx;
}

// (19:3) {#if selected == elm.value}
function create_if_block$q(ctx) {
	let checkicon;
	let current;
	checkicon = new CheckIcon({});

	return {
		c() {
			create_component(checkicon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(checkicon, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(checkicon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(checkicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(checkicon, detaching);
		}
	};
}

// (17:1) {#each list as elm}
function create_each_block$a(ctx) {
	let div;
	let t0;
	let span;
	let t1_value = /*elm*/ ctx[5].label + "";
	let t1;
	let span_class_value;
	let t2;
	let current;
	let mounted;
	let dispose;
	let if_block = /*selected*/ ctx[0] == /*elm*/ ctx[5].value && create_if_block$q();

	function click_handler(...args) {
		return /*click_handler*/ ctx[3](/*elm*/ ctx[5], ...args);
	}

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			t0 = space();
			span = element("span");
			t1 = text(t1_value);
			t2 = space();

			attr(span, "class", span_class_value = "" + ((/*selected*/ ctx[0] == /*elm*/ ctx[5].value
			? 'ml-1'
			: 'ml-5') + " pr-2"));

			attr(div, "class", "px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			append(div, t0);
			append(div, span);
			append(span, t1);
			append(div, t2);
			current = true;

			if (!mounted) {
				dispose = listen(div, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (/*selected*/ ctx[0] == /*elm*/ ctx[5].value) {
				if (if_block) {
					if (dirty & /*selected, list*/ 3) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$q();
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, t0);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if ((!current || dirty & /*list*/ 2) && t1_value !== (t1_value = /*elm*/ ctx[5].label + "")) set_data(t1, t1_value);

			if (!current || dirty & /*selected, list*/ 3 && span_class_value !== (span_class_value = "" + ((/*selected*/ ctx[0] == /*elm*/ ctx[5].value
			? 'ml-1'
			: 'ml-5') + " pr-2"))) {
				attr(span, "class", span_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$V(ctx) {
	let div;
	let current;
	let each_value = /*list*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "shadow-xl border-r border-l rounded mt-1 bg-white");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*select, list, selected*/ 7) {
				each_value = /*list*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$a(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$a(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$F($$self, $$props, $$invalidate) {
	let dispatch = createEventDispatcher();
	let { list = [] } = $$props;
	let { selected } = $$props;

	function select(e, val) {
		$$invalidate(0, selected = val);
		dispatch('select', selected);
		e.stopPropagation();
		e.preventDefault();
	}

	const click_handler = (elm, e) => select(e, elm.value);

	$$self.$$set = $$props => {
		if ('list' in $$props) $$invalidate(1, list = $$props.list);
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
	};

	return [selected, list, select, click_handler];
}

class List extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$F, create_fragment$V, safe_not_equal, { list: 1, selected: 0 });
	}
}

/* ../tailwind-editor/src/ToolBar/DropDown.svelte generated by Svelte v3.55.0 */

const { window: window_1 } = globals;

function fallback_block(ctx) {
	let t;

	return {
		c() {
			t = text("Click To show");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (58:1) {#if open}
function create_if_block$p(ctx) {
	let div;
	let list_1;
	let div_class_value;
	let current;

	list_1 = new List({
			props: {
				list: /*list*/ ctx[3],
				selected: /*selected*/ ctx[2]
			}
		});

	list_1.$on("select", /*select_handler*/ ctx[10]);

	return {
		c() {
			div = element("div");
			create_component(list_1.$$.fragment);
			attr(div, "class", div_class_value = "absolute -ml-1 z-920 z-20 " + /*klass*/ ctx[1] + " " + /*posKlass*/ ctx[5]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(list_1, div, null);
			/*div_binding*/ ctx[11](div);
			current = true;
		},
		p(ctx, dirty) {
			const list_1_changes = {};
			if (dirty & /*list*/ 8) list_1_changes.list = /*list*/ ctx[3];
			if (dirty & /*selected*/ 4) list_1_changes.selected = /*selected*/ ctx[2];
			list_1.$set(list_1_changes);

			if (!current || dirty & /*klass, posKlass*/ 34 && div_class_value !== (div_class_value = "absolute -ml-1 z-920 z-20 " + /*klass*/ ctx[1] + " " + /*posKlass*/ ctx[5])) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(list_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(list_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(list_1);
			/*div_binding*/ ctx[11](null);
		}
	};
}

function create_fragment$U(ctx) {
	let div1;
	let div0;
	let t;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);
	const default_slot_or_fallback = default_slot || fallback_block();
	let if_block = /*open*/ ctx[0] && create_if_block$p(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			t = space();
			if (if_block) if_block.c();
			attr(div0, "class", "cursor-pointer flex h-full");
			attr(div1, "class", "relative");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(div0, null);
			}

			append(div1, t);
			if (if_block) if_block.m(div1, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(window_1, "click", /*hideList*/ ctx[7]),
					listen(div0, "click", /*toggleList*/ ctx[6])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
						null
					);
				}
			}

			if (/*open*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*open*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$p(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div1, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot_or_fallback, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(default_slot_or_fallback, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$E($$self, $$props, $$invalidate) {
	let posKlass;
	let { $$slots: slots = {}, $$scope } = $$props;
	let { class: klass = '' } = $$props;
	let { open = false } = $$props;
	let { selected } = $$props;
	let lNode;

	let { list = [
		{ label: 'none', value: 'none' },
		{ label: 'tight', value: 'tight' },
		{ label: 'snug', value: 'snug' },
		{ label: 'normal', value: 'normal' },
		{ label: 'relaxed', value: 'relaxed' },
		{ label: 'loose', value: 'loose' }
	] } = $$props;

	function toggleList(e) {
		$$invalidate(0, open = !open);
		e.preventDefault();
		e.stopPropagation();
	}

	function hideList() {
		$$invalidate(0, open = false);
	}

	function select_handler(event) {
		bubble.call(this, $$self, event);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			lNode = $$value;
			$$invalidate(4, lNode);
		});
	}

	$$self.$$set = $$props => {
		if ('class' in $$props) $$invalidate(1, klass = $$props.class);
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('selected' in $$props) $$invalidate(2, selected = $$props.selected);
		if ('list' in $$props) $$invalidate(3, list = $$props.list);
		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*lNode*/ 16) {
			$$invalidate(5, posKlass = lNode?.getBoundingClientRect()?.bottom > window.innerHeight
			? 'bottom-0 mb-8'
			: '');
		}
	};

	return [
		open,
		klass,
		selected,
		list,
		lNode,
		posKlass,
		toggleList,
		hideList,
		$$scope,
		slots,
		select_handler,
		div_binding
	];
}

class DropDown extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$E, create_fragment$U, safe_not_equal, { class: 1, open: 0, selected: 2, list: 3 });
	}
}

/* ../tailwind-editor/src/Icons/LineHeightIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$T(ctx) {
	let svg;
	let path0;
	let path1;
	let path2;
	let path3;
	let path4;

	return {
		c() {
			svg = svg_element("svg");
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			path4 = svg_element("path");
			attr(path0, "d", "M5.09668 6.99707H7.17358L4.17358 3.99707L1.17358 6.99707H3.09668V17.0031H1.15881L4.15881 20.0031L7.15881 17.0031H5.09668V6.99707Z");
			attr(path0, "fill", "currentColor");
			attr(path1, "d", "M22.8412 7H8.84119V5H22.8412V7Z");
			attr(path1, "fill", "currentColor");
			attr(path2, "d", "M22.8412 11H8.84119V9H22.8412V11Z");
			attr(path2, "fill", "currentColor");
			attr(path3, "d", "M8.84119 15H22.8412V13H8.84119V15Z");
			attr(path3, "fill", "currentColor");
			attr(path4, "d", "M22.8412 19H8.84119V17H22.8412V19Z");
			attr(path4, "fill", "currentColor");
			attr(svg, "class", "w-5 h-5 text-gray-700");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path0);
			append(svg, path1);
			append(svg, path2);
			append(svg, path3);
			append(svg, path4);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class LineHeightIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$T, safe_not_equal, {});
	}
}

/* ../tailwind-editor/src/ToolBar/Leading.svelte generated by Svelte v3.55.0 */

function create_default_slot$g(ctx) {
	let div;
	let lineheighticon;
	let current;
	lineheighticon = new LineHeightIcon({});

	return {
		c() {
			div = element("div");
			create_component(lineheighticon.$$.fragment);
			attr(div, "class", "pl-2 pr-3 py-1 h-full flex items-center");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(lineheighticon, div, null);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(lineheighticon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(lineheighticon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(lineheighticon);
		}
	};
}

function create_fragment$S(ctx) {
	let div;
	let dropdown;
	let updating_open;
	let current;

	function dropdown_open_binding(value) {
		/*dropdown_open_binding*/ ctx[7](value);
	}

	let dropdown_props = {
		list: /*list*/ ctx[3],
		selected: /*selected*/ ctx[1],
		class: "text-sm",
		$$slots: { default: [create_default_slot$g] },
		$$scope: { ctx }
	};

	if (/*open*/ ctx[0] !== void 0) {
		dropdown_props.open = /*open*/ ctx[0];
	}

	dropdown = new DropDown({ props: dropdown_props });
	binding_callbacks.push(() => bind(dropdown, 'open', dropdown_open_binding, /*open*/ ctx[0]));
	dropdown.$on("select", /*selectClass*/ ctx[2]);

	return {
		c() {
			div = element("div");
			create_component(dropdown.$$.fragment);
			attr(div, "class", "flex h-full");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(dropdown, div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const dropdown_changes = {};
			if (dirty & /*selected*/ 2) dropdown_changes.selected = /*selected*/ ctx[1];

			if (dirty & /*$$scope*/ 256) {
				dropdown_changes.$$scope = { dirty, ctx };
			}

			if (!updating_open && dirty & /*open*/ 1) {
				updating_open = true;
				dropdown_changes.open = /*open*/ ctx[0];
				add_flush_callback(() => updating_open = false);
			}

			dropdown.$set(dropdown_changes);
		},
		i(local) {
			if (current) return;
			transition_in(dropdown.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(dropdown.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(dropdown);
		}
	};
}

function instance$D($$self, $$props, $$invalidate) {
	let leading_class;
	let selected;
	let { klass = '' } = $$props;
	let { setClass = '' } = $$props;
	let open = false;

	function selectClass(evt) {
		$$invalidate(0, open = false);
		$$invalidate(1, selected = evt.detail);
		setClass('leading-' + evt.detail);
	}

	let list = [
		{ label: 'none', value: 'none' },
		{ label: 'tight', value: 'tight' },
		{ label: 'snug', value: 'snug' },
		{ label: 'normal', value: 'normal' },
		{ label: 'relaxed', value: 'relaxed' },
		{ label: 'loose', value: 'loose' }
	];

	function dropdown_open_binding(value) {
		open = value;
		$$invalidate(0, open);
	}

	$$self.$$set = $$props => {
		if ('klass' in $$props) $$invalidate(4, klass = $$props.klass);
		if ('setClass' in $$props) $$invalidate(5, setClass = $$props.setClass);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*klass*/ 16) {
			$$invalidate(6, leading_class = klass.split(' ').find(c => c.startsWith('leading')) || '');
		}

		if ($$self.$$.dirty & /*leading_class*/ 64) {
			$$invalidate(1, selected = leading_class.replace('leading-', ''));
		}
	};

	return [
		open,
		selected,
		selectClass,
		list,
		klass,
		setClass,
		leading_class,
		dropdown_open_binding
	];
}

class Leading extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$D, create_fragment$S, safe_not_equal, { klass: 4, setClass: 5 });
	}
}

/* ../tailwind-editor/src/ToolBar/HeadingList.svelte generated by Svelte v3.55.0 */

function create_default_slot$f(ctx) {
	let div;
	let t0;
	let t1;
	let downicon;
	let current;
	downicon = new DownIcon({});

	return {
		c() {
			div = element("div");
			t0 = text(/*selected_label*/ ctx[2]);
			t1 = space();
			create_component(downicon.$$.fragment);
			attr(div, "class", "pl-2 pr-3 py-1 h-full flex items-center whitespace-nowrap flex-shrink-0");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
			mount_component(downicon, div, null);
			current = true;
		},
		p(ctx, dirty) {
			if (!current || dirty & /*selected_label*/ 4) set_data(t0, /*selected_label*/ ctx[2]);
		},
		i(local) {
			if (current) return;
			transition_in(downicon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(downicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(downicon);
		}
	};
}

function create_fragment$R(ctx) {
	let div;
	let dropdown;
	let updating_open;
	let current;

	function dropdown_open_binding(value) {
		/*dropdown_open_binding*/ ctx[9](value);
	}

	let dropdown_props = {
		list: /*list*/ ctx[3],
		selected: /*selected_val*/ ctx[0],
		class: "w-32 text-sm",
		$$slots: { default: [create_default_slot$f] },
		$$scope: { ctx }
	};

	if (/*open*/ ctx[1] !== void 0) {
		dropdown_props.open = /*open*/ ctx[1];
	}

	dropdown = new DropDown({ props: dropdown_props });
	binding_callbacks.push(() => bind(dropdown, 'open', dropdown_open_binding, /*open*/ ctx[1]));
	dropdown.$on("select", /*selectClass*/ ctx[4]);

	return {
		c() {
			div = element("div");
			create_component(dropdown.$$.fragment);
			attr(div, "class", "flex h-full");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(dropdown, div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const dropdown_changes = {};
			if (dirty & /*selected_val*/ 1) dropdown_changes.selected = /*selected_val*/ ctx[0];

			if (dirty & /*$$scope, selected_label*/ 2052) {
				dropdown_changes.$$scope = { dirty, ctx };
			}

			if (!updating_open && dirty & /*open*/ 2) {
				updating_open = true;
				dropdown_changes.open = /*open*/ ctx[1];
				add_flush_callback(() => updating_open = false);
			}

			dropdown.$set(dropdown_changes);
		},
		i(local) {
			if (current) return;
			transition_in(dropdown.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(dropdown.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(dropdown);
		}
	};
}

let code_class = 'code text-sm font-mono px-8 py-6 bg-gray-100';
let quote_class = 'quote text-xl border-l-4 border-gray-800 px-4';

function instance$C($$self, $$props, $$invalidate) {
	let text_class;
	let selected_val;
	let selected;
	let selected_label;
	let { setClass } = $$props;
	let { klass = '' } = $$props;

	let list = [
		{
			label: 'Text Small',
			value: 'md:text-sm text-sm'
		},
		{
			label: 'Text',
			value: 'md:text-base text-base'
		},
		{ label: 'Code', value: code_class },
		{ label: 'Quote', value: quote_class },
		{
			label: 'Heading 1',
			value: 'md:text-6xl text-4xl'
		},
		{
			label: 'Heading 2',
			value: 'md:text-5xl text-3xl'
		},
		{
			label: 'Heading 3',
			value: 'md:text-4xl text-2xl'
		},
		{
			label: 'Heading 4',
			value: 'md:text-3xl text-xl'
		},
		{
			label: 'Heading 5',
			value: 'md:text-2xl text-xl'
		},
		{
			label: 'Heading 6',
			value: 'md:text-xl text-lg'
		}
	];

	function inList() {
		for (let v of list) {
			if (~klass.indexOf(v.value)) return v.value;
		}

		return false;
	}

	let open = false;

	function selectClass(evt) {
		$$invalidate(0, selected_val = evt.detail);
		$$invalidate(1, open = false);
		setClass(evt.detail);
	}

	function dropdown_open_binding(value) {
		open = value;
		$$invalidate(1, open);
	}

	$$self.$$set = $$props => {
		if ('setClass' in $$props) $$invalidate(5, setClass = $$props.setClass);
		if ('klass' in $$props) $$invalidate(6, klass = $$props.klass);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*klass*/ 64) {
			$$invalidate(8, text_class = klass.includes('code') && code_class || klass.includes('quote') && quote_class || inList() || '');
		}

		if ($$self.$$.dirty & /*text_class*/ 256) {
			$$invalidate(0, selected_val = text_class);
		}

		if ($$self.$$.dirty & /*selected_val*/ 1) {
			$$invalidate(7, selected = list.find(e => e.value == selected_val));
		}

		if ($$self.$$.dirty & /*selected*/ 128) {
			$$invalidate(2, selected_label = selected && selected.label || 'Text');
		}
	};

	return [
		selected_val,
		open,
		selected_label,
		list,
		selectClass,
		setClass,
		klass,
		selected,
		text_class,
		dropdown_open_binding
	];
}

class HeadingList extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$C, create_fragment$R, safe_not_equal, { setClass: 5, klass: 6 });
	}
}

/* ../tailwind-editor/src/Icons/CenterIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$Q(ctx) {
	let svg;
	let path0;
	let path1;
	let path2;
	let path3;

	return {
		c() {
			svg = svg_element("svg");
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			attr(path0, "d", "M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4Z");
			attr(path0, "fill", "currentColor");
			attr(path1, "d", "M4 13C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15H20C20.5523 15 21 14.5523 21 14C21 13.4477 20.5523 13 20 13H4Z");
			attr(path1, "fill", "currentColor");
			attr(path2, "d", "M6 10C6 9.44772 6.44772 9 7 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H7C6.44772 11 6 10.5523 6 10Z");
			attr(path2, "fill", "currentColor");
			attr(path3, "d", "M7 17C6.44772 17 6 17.4477 6 18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18C18 17.4477 17.5523 17 17 17H7Z");
			attr(path3, "fill", "currentColor");
			attr(svg, "class", "w-5 h-5");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path0);
			append(svg, path1);
			append(svg, path2);
			append(svg, path3);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class CenterIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$Q, safe_not_equal, {});
	}
}

/* ../tailwind-editor/src/Icons/LeftIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$P(ctx) {
	let svg;
	let path0;
	let path1;
	let path2;
	let path3;

	return {
		c() {
			svg = svg_element("svg");
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			attr(path0, "d", "M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4Z");
			attr(path0, "fill", "currentColor");
			attr(path1, "d", "M4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H12C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9H4Z");
			attr(path1, "fill", "currentColor");
			attr(path2, "d", "M3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14Z");
			attr(path2, "fill", "currentColor");
			attr(path3, "d", "M4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H12C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17H4Z");
			attr(path3, "fill", "currentColor");
			attr(svg, "class", "w-5 h-5");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path0);
			append(svg, path1);
			append(svg, path2);
			append(svg, path3);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class LeftIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$P, safe_not_equal, {});
	}
}

/* ../tailwind-editor/src/Icons/RightIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$O(ctx) {
	let svg;
	let path0;
	let path1;
	let path2;
	let path3;

	return {
		c() {
			svg = svg_element("svg");
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			attr(path0, "d", "M20 5C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5H20Z");
			attr(path0, "fill", "currentColor");
			attr(path1, "d", "M20 9C20.5523 9 21 9.44772 21 10C21 10.5523 20.5523 11 20 11H12C11.4477 11 11 10.5523 11 10C11 9.44772 11.4477 9 12 9H20Z");
			attr(path1, "fill", "currentColor");
			attr(path2, "d", "M21 14C21 13.4477 20.5523 13 20 13H4C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15H20C20.5523 15 21 14.5523 21 14Z");
			attr(path2, "fill", "currentColor");
			attr(path3, "d", "M20 17C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H12C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17H20Z");
			attr(path3, "fill", "currentColor");
			attr(svg, "class", "w-5 h-5");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path0);
			append(svg, path1);
			append(svg, path2);
			append(svg, path3);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class RightIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$O, safe_not_equal, {});
	}
}

/* ../tailwind-editor/src/Icons/TriangleDown.svelte generated by Svelte v3.55.0 */

function create_fragment$N(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M5 6h10l-5 9l-5-9z");
			attr(path, "fill", "currentColor");
			attr(svg, "viewBox", "0 0 20 20");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", /*klass*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, [dirty]) {
			if (dirty & /*klass*/ 1) {
				attr(svg, "class", /*klass*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$B($$self, $$props, $$invalidate) {
	let { class: klass = "w-3 h-3" } = $$props;

	$$self.$$set = $$props => {
		if ('class' in $$props) $$invalidate(0, klass = $$props.class);
	};

	return [klass];
}

class TriangleDown extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$B, create_fragment$N, safe_not_equal, { class: 0 });
	}
}

const STYLE = {
    BOLD: 'font-bold',
    ITALIC: 'italic',
    UNDERLINE: 'underline',
    LINETHROUGH: 'line-through',
    CODE: 'font-mono px-2 border border-gray-200',
    LINK: 'link',
    CENTER: 'text-center',
    LEFT: 'text-left',
    RIGHT: 'text-right',
    JUSTIFY: 'text-justify'
};


const PADDINGS = ['0','px','0.5','1','2','3','4','5','10','20','40','60'];

const SIZES = ['auto','full','3','4','10','16','20','32','40','60','80','96','128'];

/* ../tailwind-editor/src/ToolBar/TextAlign.svelte generated by Svelte v3.55.0 */

function create_else_block$c(ctx) {
	let lefticon;
	let current;
	lefticon = new LeftIcon({});

	return {
		c() {
			create_component(lefticon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(lefticon, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(lefticon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(lefticon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(lefticon, detaching);
		}
	};
}

// (32:34) 
function create_if_block_2$7(ctx) {
	let righticon;
	let current;
	righticon = new RightIcon({});

	return {
		c() {
			create_component(righticon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(righticon, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(righticon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(righticon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(righticon, detaching);
		}
	};
}

// (30:8) {#if e_classes.center}
function create_if_block_1$b(ctx) {
	let centericon;
	let current;
	centericon = new CenterIcon({});

	return {
		c() {
			create_component(centericon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(centericon, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(centericon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(centericon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(centericon, detaching);
		}
	};
}

// (40:4) {#if open}
function create_if_block$o(ctx) {
	let div3;
	let div0;
	let lefticon;
	let div0_class_value;
	let t0;
	let div1;
	let centericon;
	let div1_class_value;
	let t1;
	let div2;
	let righticon;
	let div2_class_value;
	let div3_class_value;
	let current;
	let mounted;
	let dispose;
	lefticon = new LeftIcon({});
	centericon = new CenterIcon({});
	righticon = new RightIcon({});

	return {
		c() {
			div3 = element("div");
			div0 = element("div");
			create_component(lefticon.$$.fragment);
			t0 = space();
			div1 = element("div");
			create_component(centericon.$$.fragment);
			t1 = space();
			div2 = element("div");
			create_component(righticon.$$.fragment);

			attr(div0, "class", div0_class_value = "px-2 " + (/*e_classes*/ ctx[0].left
			? 'text-blue-600'
			: 'text-gray-700') + " cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center");

			attr(div1, "class", div1_class_value = "px-2 " + (/*e_classes*/ ctx[0].center
			? 'text-blue-600'
			: 'text-gray-700') + " cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center");

			attr(div2, "class", div2_class_value = "px-2 " + (/*e_classes*/ ctx[0].right
			? 'text-blue-600'
			: 'text-gray-700') + " cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center border-r");

			attr(div3, "class", div3_class_value = "absolute shadow-xl " + /*posKlass*/ ctx[3] + " bg-white");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			mount_component(lefticon, div0, null);
			append(div3, t0);
			append(div3, div1);
			mount_component(centericon, div1, null);
			append(div3, t1);
			append(div3, div2);
			mount_component(righticon, div2, null);
			/*div3_binding*/ ctx[9](div3);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div0, "mousedown", /*mousedown_handler*/ ctx[6]),
					listen(div1, "mousedown", /*mousedown_handler_1*/ ctx[7]),
					listen(div2, "mousedown", /*mousedown_handler_2*/ ctx[8])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (!current || dirty & /*e_classes*/ 1 && div0_class_value !== (div0_class_value = "px-2 " + (/*e_classes*/ ctx[0].left
			? 'text-blue-600'
			: 'text-gray-700') + " cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center")) {
				attr(div0, "class", div0_class_value);
			}

			if (!current || dirty & /*e_classes*/ 1 && div1_class_value !== (div1_class_value = "px-2 " + (/*e_classes*/ ctx[0].center
			? 'text-blue-600'
			: 'text-gray-700') + " cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center")) {
				attr(div1, "class", div1_class_value);
			}

			if (!current || dirty & /*e_classes*/ 1 && div2_class_value !== (div2_class_value = "px-2 " + (/*e_classes*/ ctx[0].right
			? 'text-blue-600'
			: 'text-gray-700') + " cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center border-r")) {
				attr(div2, "class", div2_class_value);
			}

			if (!current || dirty & /*posKlass*/ 8 && div3_class_value !== (div3_class_value = "absolute shadow-xl " + /*posKlass*/ ctx[3] + " bg-white")) {
				attr(div3, "class", div3_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(lefticon.$$.fragment, local);
			transition_in(centericon.$$.fragment, local);
			transition_in(righticon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(lefticon.$$.fragment, local);
			transition_out(centericon.$$.fragment, local);
			transition_out(righticon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			destroy_component(lefticon);
			destroy_component(centericon);
			destroy_component(righticon);
			/*div3_binding*/ ctx[9](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$M(ctx) {
	let div1;
	let div0;
	let current_block_type_index;
	let if_block0;
	let t0;
	let triangledown;
	let t1;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_1$b, create_if_block_2$7, create_else_block$c];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*e_classes*/ ctx[0].center) return 0;
		if (/*e_classes*/ ctx[0].right) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	triangledown = new TriangleDown({});
	let if_block1 = /*open*/ ctx[2] && create_if_block$o(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if_block0.c();
			t0 = space();
			create_component(triangledown.$$.fragment);
			t1 = space();
			if (if_block1) if_block1.c();
			attr(div0, "class", "px-2 text-gray-700 hover:bg-gray-200 cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center");
			attr(div1, "class", "relative h-full");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			if_blocks[current_block_type_index].m(div0, null);
			append(div0, t0);
			mount_component(triangledown, div0, null);
			append(div1, t1);
			if (if_block1) if_block1.m(div1, null);
			current = true;

			if (!mounted) {
				dispose = listen(div0, "mousedown", /*toggleList*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index !== previous_block_index) {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				}

				transition_in(if_block0, 1);
				if_block0.m(div0, t0);
			}

			if (/*open*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*open*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$o(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(triangledown.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(triangledown.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if_blocks[current_block_type_index].d();
			destroy_component(triangledown);
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};
}

function instance$A($$self, $$props, $$invalidate) {
	let posKlass;
	const dispatch = createEventDispatcher();
	let lNode;
	let { e_classes } = $$props;
	let open = false;

	function toggleList() {
		$$invalidate(2, open = !open);
	}

	function select(pos) {
		dispatch('select', pos);
	}

	const mousedown_handler = () => select(STYLE.LEFT);
	const mousedown_handler_1 = () => select(STYLE.CENTER);
	const mousedown_handler_2 = () => select(STYLE.RIGHT);

	function div3_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			lNode = $$value;
			$$invalidate(1, lNode);
		});
	}

	$$self.$$set = $$props => {
		if ('e_classes' in $$props) $$invalidate(0, e_classes = $$props.e_classes);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*lNode*/ 2) {
			$$invalidate(3, posKlass = lNode?.getBoundingClientRect()?.bottom > window.innerHeight
			? 'bottom-0 mb-8'
			: '');
		}
	};

	return [
		e_classes,
		lNode,
		open,
		posKlass,
		toggleList,
		select,
		mousedown_handler,
		mousedown_handler_1,
		mousedown_handler_2,
		div3_binding
	];
}

class TextAlign extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$A, create_fragment$M, safe_not_equal, { e_classes: 0 });
	}
}

/* ../tailwind-editor/src/Icons/PaddingIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$L(ctx) {
	let svg;
	let g;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			g = svg_element("g");
			path = svg_element("path");
			attr(path, "fill-rule", "evenodd");
			attr(path, "clip-rule", "evenodd");
			attr(path, "d", "M2.857 2h9.286c.473 0 .857.384.857.857v9.286a.857.857 0 0 1-.857.857H2.857A.857.857 0 0 1 2 12.143V2.857C2 2.384 2.384 2 2.857 2zM1 2.857C1 1.831 1.831 1 2.857 1h9.286C13.168 1 14 1.831 14 2.857v9.286A1.857 1.857 0 0 1 12.143 14H2.857A1.857 1.857 0 0 1 1 12.143V2.857zM7.5 5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zm-3 6a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zM5 7.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zM4.5 5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zm6.5 5.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zM10.5 8a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zm.5-3.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zM7.5 11a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1z");
			attr(path, "fill", "currentColor");
			attr(g, "fill", "none");
			attr(svg, "viewBox", "0 0 15 15");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", /*klass*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, g);
			append(g, path);
		},
		p(ctx, [dirty]) {
			if (dirty & /*klass*/ 1) {
				attr(svg, "class", /*klass*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$z($$self, $$props, $$invalidate) {
	let { class: klass = "w-5 h-5" } = $$props;

	$$self.$$set = $$props => {
		if ('class' in $$props) $$invalidate(0, klass = $$props.class);
	};

	return [klass];
}

class PaddingIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$z, create_fragment$L, safe_not_equal, { class: 0 });
	}
}

/* ../tailwind-editor/src/Icons/MarginIcon.svelte generated by Svelte v3.55.0 */

function create_fragment$K(ctx) {
	let svg;
	let g;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			g = svg_element("g");
			path = svg_element("path");
			attr(path, "fill-rule", "evenodd");
			attr(path, "clip-rule", "evenodd");
			attr(path, "d", "M1.5 2a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zm3 0a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zM8 1.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zm2.5.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zm3.5-.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zM1.5 14a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zm.5-3.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zM1.5 8a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zM2 4.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zM13.5 11a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zm.5-3.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zM13.5 5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zM5 13.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zm2.5.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zm3.5-.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zm2.5.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1zM4 5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm1 0h5v5H5V5z");
			attr(path, "fill", "currentColor");
			attr(g, "fill", "none");
			attr(svg, "viewBox", "0 0 15 15");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", /*klass*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, g);
			append(g, path);
		},
		p(ctx, [dirty]) {
			if (dirty & /*klass*/ 1) {
				attr(svg, "class", /*klass*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$y($$self, $$props, $$invalidate) {
	let { class: klass = "w-5 h-5" } = $$props;

	$$self.$$set = $$props => {
		if ('class' in $$props) $$invalidate(0, klass = $$props.class);
	};

	return [klass];
}

class MarginIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$y, create_fragment$K, safe_not_equal, { class: 0 });
	}
}

/* ../tailwind-editor/src/ToolBar/Spacing.svelte generated by Svelte v3.55.0 */

function get_each_context$9(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	return child_ctx;
}

function get_each_context_1$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	return child_ctx;
}

// (39:8) {:else}
function create_else_block$b(ctx) {
	let paddingicon;
	let current;
	paddingicon = new PaddingIcon({});

	return {
		c() {
			create_component(paddingicon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(paddingicon, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(paddingicon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(paddingicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(paddingicon, detaching);
		}
	};
}

// (37:8) {#if mp == "m"}
function create_if_block_1$a(ctx) {
	let marginicon;
	let current;
	marginicon = new MarginIcon({});

	return {
		c() {
			create_component(marginicon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(marginicon, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(marginicon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(marginicon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(marginicon, detaching);
		}
	};
}

// (44:4) {#if open}
function create_if_block$n(ctx) {
	let div;
	let t0;
	let select0;
	let t1;
	let select1;
	let t2;
	let select2;
	let t3;
	let select3;
	let div_class_value;
	let mounted;
	let dispose;
	let each_value_3 = PADDINGS;
	let each_blocks_3 = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks_3[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	let each_value_2 = PADDINGS;
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	let each_value_1 = PADDINGS;
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$5(get_each_context_1$5(ctx, each_value_1, i));
	}

	let each_value = PADDINGS;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
	}

	return {
		c() {
			div = element("div");
			t0 = text("Top \r\n                ");
			select0 = element("select");

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				each_blocks_3[i].c();
			}

			t1 = text("\r\n                Right \r\n                ");
			select1 = element("select");

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t2 = text("\r\n                Bottom \r\n                ");
			select2 = element("select");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t3 = text("\r\n                Left \r\n                ");
			select3 = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(select0, "class", "focus:outline-none border");
			if (/*pt*/ ctx[7] === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[13].call(select0));
			attr(select1, "class", "focus:outline-none border");
			if (/*pr*/ ctx[6] === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[14].call(select1));
			attr(select2, "class", "focus:outline-none border");
			if (/*pb*/ ctx[5] === void 0) add_render_callback(() => /*select2_change_handler*/ ctx[15].call(select2));
			attr(select3, "class", "focus:outline-none border");
			if (/*pl*/ ctx[4] === void 0) add_render_callback(() => /*select3_change_handler*/ ctx[16].call(select3));
			attr(div, "class", div_class_value = "absolute shadow-xl bg-white grid grid-cols-2 w-24 p-2 gap-1 text-xs font-semibold " + /*posKlass*/ ctx[8]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, select0);

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				each_blocks_3[i].m(select0, null);
			}

			select_option(select0, /*pt*/ ctx[7]);
			append(div, t1);
			append(div, select1);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].m(select1, null);
			}

			select_option(select1, /*pr*/ ctx[6]);
			append(div, t2);
			append(div, select2);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(select2, null);
			}

			select_option(select2, /*pb*/ ctx[5]);
			append(div, t3);
			append(div, select3);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select3, null);
			}

			select_option(select3, /*pl*/ ctx[4]);
			/*div_binding*/ ctx[17](div);

			if (!mounted) {
				dispose = [
					listen(select0, "change", /*select0_change_handler*/ ctx[13]),
					listen(select0, "change", /*updateP*/ ctx[10]),
					listen(select0, "blur", /*updateP*/ ctx[10]),
					listen(select1, "change", /*select1_change_handler*/ ctx[14]),
					listen(select1, "change", /*updateP*/ ctx[10]),
					listen(select1, "blur", /*updateP*/ ctx[10]),
					listen(select2, "change", /*select2_change_handler*/ ctx[15]),
					listen(select2, "change", /*updateP*/ ctx[10]),
					listen(select2, "blur", /*updateP*/ ctx[10]),
					listen(select3, "change", /*select3_change_handler*/ ctx[16]),
					listen(select3, "change", /*updateP*/ ctx[10]),
					listen(select3, "blur", /*updateP*/ ctx[10])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*mp, PADDINGS*/ 1) {
				each_value_3 = PADDINGS;
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks_3[i]) {
						each_blocks_3[i].p(child_ctx, dirty);
					} else {
						each_blocks_3[i] = create_each_block_3(child_ctx);
						each_blocks_3[i].c();
						each_blocks_3[i].m(select0, null);
					}
				}

				for (; i < each_blocks_3.length; i += 1) {
					each_blocks_3[i].d(1);
				}

				each_blocks_3.length = each_value_3.length;
			}

			if (dirty & /*pt, mp, PADDINGS*/ 129) {
				select_option(select0, /*pt*/ ctx[7]);
			}

			if (dirty & /*mp, PADDINGS*/ 1) {
				each_value_2 = PADDINGS;
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_2(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(select1, null);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_2.length;
			}

			if (dirty & /*pr, mp, PADDINGS*/ 65) {
				select_option(select1, /*pr*/ ctx[6]);
			}

			if (dirty & /*mp, PADDINGS*/ 1) {
				each_value_1 = PADDINGS;
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$5(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$5(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(select2, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty & /*pb, mp, PADDINGS*/ 33) {
				select_option(select2, /*pb*/ ctx[5]);
			}

			if (dirty & /*mp, PADDINGS*/ 1) {
				each_value = PADDINGS;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$9(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$9(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select3, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*pl, mp, PADDINGS*/ 17) {
				select_option(select3, /*pl*/ ctx[4]);
			}

			if (dirty & /*posKlass*/ 256 && div_class_value !== (div_class_value = "absolute shadow-xl bg-white grid grid-cols-2 w-24 p-2 gap-1 text-xs font-semibold " + /*posKlass*/ ctx[8])) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks_3, detaching);
			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			/*div_binding*/ ctx[17](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (48:20) {#each PADDINGS as p}
function create_each_block_3(ctx) {
	let option;
	let t_value = /*p*/ ctx[19] + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = option_value_value = "" + (/*mp*/ ctx[0] + "t-" + /*p*/ ctx[19]);
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*mp*/ 1 && option_value_value !== (option_value_value = "" + (/*mp*/ ctx[0] + "t-" + /*p*/ ctx[19]))) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (54:20) {#each PADDINGS as p}
function create_each_block_2(ctx) {
	let option;
	let t_value = /*p*/ ctx[19] + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = option_value_value = "" + (/*mp*/ ctx[0] + "r-" + /*p*/ ctx[19]);
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*mp*/ 1 && option_value_value !== (option_value_value = "" + (/*mp*/ ctx[0] + "r-" + /*p*/ ctx[19]))) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (60:20) {#each PADDINGS as p}
function create_each_block_1$5(ctx) {
	let option;
	let t_value = /*p*/ ctx[19] + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = option_value_value = "" + (/*mp*/ ctx[0] + "b-" + /*p*/ ctx[19]);
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*mp*/ 1 && option_value_value !== (option_value_value = "" + (/*mp*/ ctx[0] + "b-" + /*p*/ ctx[19]))) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (66:20) {#each PADDINGS as p}
function create_each_block$9(ctx) {
	let option;
	let t_value = /*p*/ ctx[19] + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = option_value_value = "" + (/*mp*/ ctx[0] + "l-" + /*p*/ ctx[19]);
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*mp*/ 1 && option_value_value !== (option_value_value = "" + (/*mp*/ ctx[0] + "l-" + /*p*/ ctx[19]))) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

function create_fragment$J(ctx) {
	let div1;
	let div0;
	let current_block_type_index;
	let if_block0;
	let t0;
	let triangledown;
	let t1;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_1$a, create_else_block$b];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*mp*/ ctx[0] == "m") return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	triangledown = new TriangleDown({});
	let if_block1 = /*open*/ ctx[3] && create_if_block$n(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if_block0.c();
			t0 = space();
			create_component(triangledown.$$.fragment);
			t1 = space();
			if (if_block1) if_block1.c();
			attr(div0, "class", "px-2 text-gray-700 hover:bg-gray-200 cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center");
			attr(div1, "class", "relative h-full");
			attr(div1, "title", /*title*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			if_blocks[current_block_type_index].m(div0, null);
			append(div0, t0);
			mount_component(triangledown, div0, null);
			append(div1, t1);
			if (if_block1) if_block1.m(div1, null);
			current = true;

			if (!mounted) {
				dispose = listen(div0, "mousedown", /*toggleList*/ ctx[9]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index !== previous_block_index) {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				}

				transition_in(if_block0, 1);
				if_block0.m(div0, t0);
			}

			if (/*open*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$n(ctx);
					if_block1.c();
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty & /*title*/ 2) {
				attr(div1, "title", /*title*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(triangledown.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(triangledown.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if_blocks[current_block_type_index].d();
			destroy_component(triangledown);
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};
}

function instance$x($$self, $$props, $$invalidate) {
	let posKlass;
	let v;
	let pt;
	let pr;
	let pb;
	let pl;
	const dispatch = createEventDispatcher();
	let { mp = "p" } = $$props;
	let { g_classes = "" } = $$props;
	let { title = "Padding" } = $$props;
	let lNode;
	let open = false;

	function toggleList() {
		$$invalidate(3, open = !open);
	}

	function updateP(e) {
		dispatch('select', e.currentTarget.value);
	}

	function select0_change_handler() {
		pt = select_value(this);
		((($$invalidate(7, pt), $$invalidate(11, g_classes)), $$invalidate(0, mp)), $$invalidate(12, v));
		$$invalidate(0, mp);
	}

	function select1_change_handler() {
		pr = select_value(this);
		((($$invalidate(6, pr), $$invalidate(11, g_classes)), $$invalidate(0, mp)), $$invalidate(12, v));
		$$invalidate(0, mp);
	}

	function select2_change_handler() {
		pb = select_value(this);
		((($$invalidate(5, pb), $$invalidate(11, g_classes)), $$invalidate(0, mp)), $$invalidate(12, v));
		$$invalidate(0, mp);
	}

	function select3_change_handler() {
		pl = select_value(this);
		((($$invalidate(4, pl), $$invalidate(11, g_classes)), $$invalidate(0, mp)), $$invalidate(12, v));
		$$invalidate(0, mp);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			lNode = $$value;
			$$invalidate(2, lNode);
		});
	}

	$$self.$$set = $$props => {
		if ('mp' in $$props) $$invalidate(0, mp = $$props.mp);
		if ('g_classes' in $$props) $$invalidate(11, g_classes = $$props.g_classes);
		if ('title' in $$props) $$invalidate(1, title = $$props.title);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*lNode*/ 4) {
			$$invalidate(8, posKlass = lNode?.getBoundingClientRect()?.bottom > window.innerHeight
			? 'bottom-0 mb-8'
			: '');
		}

		if ($$self.$$.dirty & /*g_classes, mp, v*/ 6145) {
			$$invalidate(7, pt = g_classes.split(' ').find(s => s.startsWith(`${mp}t`)) || `${mp}t-${v}`);
		}

		if ($$self.$$.dirty & /*g_classes, mp, v*/ 6145) {
			$$invalidate(6, pr = g_classes.split(' ').find(s => s.startsWith(`${mp}r`)) || `${mp}r-${v}`);
		}

		if ($$self.$$.dirty & /*g_classes, mp, v*/ 6145) {
			$$invalidate(5, pb = g_classes.split(' ').find(s => s.startsWith(`${mp}b`)) || `${mp}b-${v}`);
		}

		if ($$self.$$.dirty & /*g_classes, mp, v*/ 6145) {
			$$invalidate(4, pl = g_classes.split(' ').find(s => s.startsWith(`${mp}l`)) || `${mp}l-${v}`);
		}
	};

	$$invalidate(12, v = 0); // mp == 'p' ? 2 : 0

	return [
		mp,
		title,
		lNode,
		open,
		pl,
		pb,
		pr,
		pt,
		posKlass,
		toggleList,
		updateP,
		g_classes,
		v,
		select0_change_handler,
		select1_change_handler,
		select2_change_handler,
		select3_change_handler,
		div_binding
	];
}

class Spacing extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$x, create_fragment$J, safe_not_equal, { mp: 0, g_classes: 11, title: 1 });
	}
}

/* ../tailwind-editor/src/ToolBar/ToolBar.svelte generated by Svelte v3.55.0 */

function create_fragment$I(ctx) {
	let div14;
	let div13;
	let div0;
	let headinglist;
	let t0;
	let div1;
	let t1;
	let div1_class_value;
	let t2;
	let div2;
	let t3;
	let div2_class_value;
	let t4;
	let div3;
	let t5;
	let div3_class_value;
	let t6;
	let div4;
	let t7;
	let div4_class_value;
	let t8;
	let div5;
	let t9;
	let div5_class_value;
	let t10;
	let div6;
	let codeicon;
	let div6_class_value;
	let t11;
	let div7;
	let linkinput;
	let div7_class_value;
	let t12;
	let div8;
	let colorpicker0;
	let t13;
	let div9;
	let colorpicker1;
	let t14;
	let div10;
	let justifyicon;
	let div10_class_value;
	let t15;
	let textalign;
	let t16;
	let div11;
	let spacing;
	let t17;
	let div12;
	let leading;
	let current;
	let mounted;
	let dispose;

	headinglist = new HeadingList({
			props: {
				setClass: /*setGClass*/ ctx[3],
				klass: /*g_classes*/ ctx[1]
			}
		});

	codeicon = new CodeIcon({});

	linkinput = new LinkInput({
			props: {
				setLink: /*setClass*/ ctx[2],
				href: /*href*/ ctx[4],
				blank: /*blank*/ ctx[5]
			}
		});

	linkinput.$on("close", /*close*/ ctx[8]);

	colorpicker0 = new ColorPicker({
			props: {
				setClass: /*setClass*/ ctx[2],
				klass: /*classes*/ ctx[0]
			}
		});

	colorpicker1 = new ColorPicker({
			props: {
				txt: "bg",
				setClass: /*setClass*/ ctx[2],
				klass: /*classes*/ ctx[0]
			}
		});

	justifyicon = new JustifyIcon({});

	textalign = new TextAlign({
			props: { e_classes: /*e_classes*/ ctx[6] }
		});

	textalign.$on("select", /*select_handler*/ ctx[21]);

	spacing = new Spacing({
			props: {
				mp: "m",
				title: "Margin",
				g_classes: /*g_classes*/ ctx[1]
			}
		});

	spacing.$on("select", /*select_handler_1*/ ctx[22]);

	leading = new Leading({
			props: {
				setClass: /*setGClass*/ ctx[3],
				klass: /*g_classes*/ ctx[1]
			}
		});

	return {
		c() {
			div14 = element("div");
			div13 = element("div");
			div0 = element("div");
			create_component(headinglist.$$.fragment);
			t0 = space();
			div1 = element("div");
			t1 = text("B");
			t2 = space();
			div2 = element("div");
			t3 = text("i");
			t4 = space();
			div3 = element("div");
			t5 = text("U");
			t6 = space();
			div4 = element("div");
			t7 = text("S");
			t8 = space();
			div5 = element("div");
			t9 = text("P");
			t10 = space();
			div6 = element("div");
			create_component(codeicon.$$.fragment);
			t11 = space();
			div7 = element("div");
			create_component(linkinput.$$.fragment);
			t12 = space();
			div8 = element("div");
			create_component(colorpicker0.$$.fragment);
			t13 = space();
			div9 = element("div");
			create_component(colorpicker1.$$.fragment);
			t14 = space();
			div10 = element("div");
			create_component(justifyicon.$$.fragment);
			t15 = space();
			create_component(textalign.$$.fragment);
			t16 = space();
			div11 = element("div");
			create_component(spacing.$$.fragment);
			t17 = space();
			div12 = element("div");
			create_component(leading.$$.fragment);
			attr(div0, "class", "border-r");
			attr(div1, "class", div1_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].bold ? 'text-blue-600' : '') + " font-medium hover:bg-gray-200 py-1");
			attr(div2, "class", div2_class_value = "px-3 cursor-pointer select-none " + (/*e_classes*/ ctx[6].italic ? 'text-blue-600' : '') + " italic hover:bg-gray-200 py-1");
			attr(div3, "class", div3_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].underline ? 'text-blue-600' : '') + " underline hover:bg-gray-200 py-1");
			attr(div4, "class", div4_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].linethrough ? 'text-blue-600' : '') + " line-through hover:bg-gray-200 py-1");
			attr(div5, "class", div5_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].padding ? 'text-blue-600' : '') + " font-medium hover:bg-gray-200 py-1");
			attr(div6, "class", div6_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].code ? 'text-blue-600' : '') + " line-through hover:bg-gray-200 py-2");
			attr(div7, "class", div7_class_value = "" + ((/*e_classes*/ ctx[6].link ? 'text-blue-600' : '') + " cursor-pointer select-none hover:bg-gray-200 text-sm border-r"));
			attr(div8, "class", "pl-1 cursor-pointer select-none hover:bg-gray-200 py-1 ");
			attr(div9, "class", "px-1 cursor-pointer select-none hover:bg-gray-200 border-r h-full flex items-center");

			attr(div10, "class", div10_class_value = "px-2 " + (/*e_classes*/ ctx[6].justify
			? 'text-blue-600'
			: 'text-gray-700') + " cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center");

			attr(div11, "class", "h-full");
			attr(div12, "class", "cursor-pointer select-none hover:bg-gray-200 h-full flex items-center border-l");
			attr(div13, "class", "rounded flex items-center shadow-lg border border-gray-200 text-gray-700");
			attr(div14, "class", "flex fixed font-normal -mt-6 shadow bg-white z-50 z-950 text-base rounded");
		},
		m(target, anchor) {
			insert(target, div14, anchor);
			append(div14, div13);
			append(div13, div0);
			mount_component(headinglist, div0, null);
			append(div13, t0);
			append(div13, div1);
			append(div1, t1);
			append(div13, t2);
			append(div13, div2);
			append(div2, t3);
			append(div13, t4);
			append(div13, div3);
			append(div3, t5);
			append(div13, t6);
			append(div13, div4);
			append(div4, t7);
			append(div13, t8);
			append(div13, div5);
			append(div5, t9);
			append(div13, t10);
			append(div13, div6);
			mount_component(codeicon, div6, null);
			append(div13, t11);
			append(div13, div7);
			mount_component(linkinput, div7, null);
			append(div13, t12);
			append(div13, div8);
			mount_component(colorpicker0, div8, null);
			append(div13, t13);
			append(div13, div9);
			mount_component(colorpicker1, div9, null);
			append(div13, t14);
			append(div13, div10);
			mount_component(justifyicon, div10, null);
			append(div13, t15);
			mount_component(textalign, div13, null);
			append(div13, t16);
			append(div13, div11);
			mount_component(spacing, div11, null);
			append(div13, t17);
			append(div13, div12);
			mount_component(leading, div12, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div1, "mousedown", /*toggleBold*/ ctx[10]),
					listen(div2, "mousedown", /*mousedown_handler_1*/ ctx[16]),
					listen(div3, "mousedown", /*mousedown_handler_2*/ ctx[17]),
					listen(div4, "mousedown", /*mousedown_handler_3*/ ctx[18]),
					listen(div5, "mousedown", /*togglePadding*/ ctx[11]),
					listen(div6, "mousedown", /*mousedown_handler_4*/ ctx[19]),
					listen(div10, "mousedown", /*mousedown_handler_5*/ ctx[20]),
					action_destroyer(/*setPosition*/ ctx[7].call(null, div14)),
					listen(div14, "mousedown", stop_propagation(/*mousedown_handler*/ ctx[15]))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const headinglist_changes = {};
			if (dirty & /*setGClass*/ 8) headinglist_changes.setClass = /*setGClass*/ ctx[3];
			if (dirty & /*g_classes*/ 2) headinglist_changes.klass = /*g_classes*/ ctx[1];
			headinglist.$set(headinglist_changes);

			if (!current || dirty & /*e_classes*/ 64 && div1_class_value !== (div1_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].bold ? 'text-blue-600' : '') + " font-medium hover:bg-gray-200 py-1")) {
				attr(div1, "class", div1_class_value);
			}

			if (!current || dirty & /*e_classes*/ 64 && div2_class_value !== (div2_class_value = "px-3 cursor-pointer select-none " + (/*e_classes*/ ctx[6].italic ? 'text-blue-600' : '') + " italic hover:bg-gray-200 py-1")) {
				attr(div2, "class", div2_class_value);
			}

			if (!current || dirty & /*e_classes*/ 64 && div3_class_value !== (div3_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].underline ? 'text-blue-600' : '') + " underline hover:bg-gray-200 py-1")) {
				attr(div3, "class", div3_class_value);
			}

			if (!current || dirty & /*e_classes*/ 64 && div4_class_value !== (div4_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].linethrough ? 'text-blue-600' : '') + " line-through hover:bg-gray-200 py-1")) {
				attr(div4, "class", div4_class_value);
			}

			if (!current || dirty & /*e_classes*/ 64 && div5_class_value !== (div5_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].padding ? 'text-blue-600' : '') + " font-medium hover:bg-gray-200 py-1")) {
				attr(div5, "class", div5_class_value);
			}

			if (!current || dirty & /*e_classes*/ 64 && div6_class_value !== (div6_class_value = "px-2 cursor-pointer select-none " + (/*e_classes*/ ctx[6].code ? 'text-blue-600' : '') + " line-through hover:bg-gray-200 py-2")) {
				attr(div6, "class", div6_class_value);
			}

			const linkinput_changes = {};
			if (dirty & /*setClass*/ 4) linkinput_changes.setLink = /*setClass*/ ctx[2];
			if (dirty & /*href*/ 16) linkinput_changes.href = /*href*/ ctx[4];
			if (dirty & /*blank*/ 32) linkinput_changes.blank = /*blank*/ ctx[5];
			linkinput.$set(linkinput_changes);

			if (!current || dirty & /*e_classes*/ 64 && div7_class_value !== (div7_class_value = "" + ((/*e_classes*/ ctx[6].link ? 'text-blue-600' : '') + " cursor-pointer select-none hover:bg-gray-200 text-sm border-r"))) {
				attr(div7, "class", div7_class_value);
			}

			const colorpicker0_changes = {};
			if (dirty & /*setClass*/ 4) colorpicker0_changes.setClass = /*setClass*/ ctx[2];
			if (dirty & /*classes*/ 1) colorpicker0_changes.klass = /*classes*/ ctx[0];
			colorpicker0.$set(colorpicker0_changes);
			const colorpicker1_changes = {};
			if (dirty & /*setClass*/ 4) colorpicker1_changes.setClass = /*setClass*/ ctx[2];
			if (dirty & /*classes*/ 1) colorpicker1_changes.klass = /*classes*/ ctx[0];
			colorpicker1.$set(colorpicker1_changes);

			if (!current || dirty & /*e_classes*/ 64 && div10_class_value !== (div10_class_value = "px-2 " + (/*e_classes*/ ctx[6].justify
			? 'text-blue-600'
			: 'text-gray-700') + " cursor-pointer select-none hover:bg-gray-200 py-1 h-full flex items-center")) {
				attr(div10, "class", div10_class_value);
			}

			const textalign_changes = {};
			if (dirty & /*e_classes*/ 64) textalign_changes.e_classes = /*e_classes*/ ctx[6];
			textalign.$set(textalign_changes);
			const spacing_changes = {};
			if (dirty & /*g_classes*/ 2) spacing_changes.g_classes = /*g_classes*/ ctx[1];
			spacing.$set(spacing_changes);
			const leading_changes = {};
			if (dirty & /*setGClass*/ 8) leading_changes.setClass = /*setGClass*/ ctx[3];
			if (dirty & /*g_classes*/ 2) leading_changes.klass = /*g_classes*/ ctx[1];
			leading.$set(leading_changes);
		},
		i(local) {
			if (current) return;
			transition_in(headinglist.$$.fragment, local);
			transition_in(codeicon.$$.fragment, local);
			transition_in(linkinput.$$.fragment, local);
			transition_in(colorpicker0.$$.fragment, local);
			transition_in(colorpicker1.$$.fragment, local);
			transition_in(justifyicon.$$.fragment, local);
			transition_in(textalign.$$.fragment, local);
			transition_in(spacing.$$.fragment, local);
			transition_in(leading.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(headinglist.$$.fragment, local);
			transition_out(codeicon.$$.fragment, local);
			transition_out(linkinput.$$.fragment, local);
			transition_out(colorpicker0.$$.fragment, local);
			transition_out(colorpicker1.$$.fragment, local);
			transition_out(justifyicon.$$.fragment, local);
			transition_out(textalign.$$.fragment, local);
			transition_out(spacing.$$.fragment, local);
			transition_out(leading.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div14);
			destroy_component(headinglist);
			destroy_component(codeicon);
			destroy_component(linkinput);
			destroy_component(colorpicker0);
			destroy_component(colorpicker1);
			destroy_component(justifyicon);
			destroy_component(textalign);
			destroy_component(spacing);
			destroy_component(leading);
			mounted = false;
			run_all(dispose);
		}
	};
}

const reg_font = /font\-(thin|normal|semibold|bold|black)/;
const reg_pad = /p\-([0-4])/;

// duplicated!! 
const reg_position = /^text\-(left|right|center)/;

const reg_padding = /^p[lrtb]\-/;
const reg_margin = /^m[lrtb]\-/;

function firstParentRelative$1(n) {
	// Make element absolute if you want to restore this
	// while(n.parentNode && n.parentNode.tagName){
	// 	n = n.parentNode
	// 	if(window.getComputedStyle(n).getPropertyValue('position').toLowerCase() == 'relative'){
	// 		return n.getBoundingClientRect()
	// 	}
	// }
	// return {top: -window.scrollY, left: 0}
	return { top: 0, left: 0 };
}

// duplicated in contenteditor (TO UPDATE!)
function replaceGClass(klass, reg, gklass) {
	let classes = gklass.split(' ');
	let s_index = classes.findIndex(c => reg.test(c));
	let selected_class = ~s_index ? classes[s_index] : '';

	if (selected_class) {
		gklass = gklass.replace(selected_class, '').trim();
	}

	gklass = gklass.split(' ').concat([klass]).join(' ');
	return gklass;
}

function instance$w($$self, $$props, $$invalidate) {
	let { setClass } = $$props;
	let { setGClass } = $$props;
	let { classes } = $$props;
	let { g_classes } = $$props;
	let { href } = $$props;
	let { blank } = $$props;
	let { base_node } = $$props;
	let dispatch = createEventDispatcher();
	let { mouseX } = $$props;

	function setPosition(node) {
		if (!base_node) return;

		let elm = base_node.parentNode.tagName == 'DIV'
		? base_node
		: base_node.parentNode;

		let rect = elm.parentNode.getBoundingClientRect();
		let posY = rect.top - 10;

		if (elm.previousElementSibling) {
			let ch_nodes = [...elm.parentNode.childNodes];
			let siblings = ch_nodes.slice(0, ch_nodes.indexOf(elm) + 1);
			let br = siblings.reverse().find(elm => elm.tagName == 'BR');

			if (br) {
				rect = br.getBoundingClientRect();
				posY = rect.top ? rect.top : posY;
			}
		}

		let rel_rect = firstParentRelative$1();
		let pos_top = posY - rel_rect.top;
		if (posY < 30) pos_top = 30;
		node.style.top = `${pos_top}px`;
		$$invalidate(13, mouseX = mouseX || 10);
		let mx = mouseX - node.offsetWidth / 2;
		mx = mx > 0 ? mx : 10;

		mx = mouseX + node.offsetWidth / 2 < window.innerWidth
		? mx
		: window.innerWidth - node.offsetWidth;

		node.style.left = `${mx - rel_rect.left}px`;
	}

	function close() {
		dispatch('close');
	}

	function cexist(klass) {
		return classes.includes(klass);
	}

	function cgexist(klass) {
		return g_classes.includes(klass);
	}

	function cregexist(reg) {
		return reg.test(classes);
	}

	let e_classes = {};

	function initEClasses() {
		$$invalidate(6, e_classes = {
			bold: cregexist(reg_font),
			padding: cregexist(reg_pad),
			italic: cexist(STYLE.ITALIC),
			underline: cexist(STYLE.UNDERLINE),
			linethrough: cexist(STYLE.LINETHROUGH),
			code: cexist(STYLE.CODE),
			link: cexist(STYLE.LINK),
			justify: cgexist(STYLE.JUSTIFY),
			center: cgexist(STYLE.CENTER),
			left: cgexist(STYLE.LEFT),
			right: cgexist(STYLE.RIGHT)
		});
	}

	initEClasses();

	function toggle(klass) {
		setClass(klass);

		if (!classes.includes(klass)) {
			$$invalidate(0, classes = classes.split(' ').concat([klass]).join(' '));
		} else {
			let n_classes = classes.split(' ');
			n_classes.splice(n_classes.indexOf(klass), 1);
			$$invalidate(0, classes = n_classes.join(' '));
		}

		initEClasses();
	}

	function toggleBold() {
		const fonts = ['thin', 'normal', 'semibold', 'bold', 'black'];
		let included = false;

		for (let i = 0; i < fonts.length; i++) {
			if (classes.includes(fonts[i])) {
				included = true;

				if (i + 1 < fonts.length) {
					$$invalidate(0, classes = classes.replace('font-' + fonts[i], 'font-' + fonts[i + 1]).trim());
					setClass('font-' + fonts[i + 1]);
				} else {
					$$invalidate(0, classes = classes.replace('font-' + fonts[i], 'font-' + fonts[0]).trim());
					setClass('font-' + fonts[0]);
				}

				break;
			}
		}

		if (!included) {
			$$invalidate(0, classes = classes.split(' ').concat(['font-bold']).join(' ').trim());
			setClass('font-bold');
		}

		initEClasses();
	}

	function togglePadding() {
		const ps = ['0', '1', '2', '3', '4'];
		let included = false;

		for (let i = 0; i < ps.length; i++) {
			if (classes.includes("p-" + ps[i])) {
				included = true;

				if (i + 1 < ps.length) {
					$$invalidate(0, classes = classes.replace('p-' + ps[i], 'p-' + ps[i + 1]).trim());
					setClass('p-' + ps[i + 1]);
				} else {
					$$invalidate(0, classes = classes.replace('p-' + ps[i], 'p-' + ps[0]).trim());
					setClass('p-' + ps[0]);
				}

				break;
			}
		}

		if (!included) {
			$$invalidate(0, classes = classes.split(' ').concat(['p-1']).join(' ').trim());
			setClass('p-1');
		}

		initEClasses();
	}

	function toggleG(klass) {
		setGClass(klass);

		if (reg_position.test(klass)) {
			$$invalidate(1, g_classes = replaceGClass(klass, reg_position, g_classes));
		} else if (reg_padding.test(klass)) {
			let reg_padd = new RegExp(`^p${klass[1]}`);
			$$invalidate(1, g_classes = replaceGClass(klass, reg_padd, g_classes));
		} else if (reg_margin.test(klass)) {
			let reg_mar = new RegExp(`^m${klass[1]}`);
			$$invalidate(1, g_classes = replaceGClass(klass, reg_mar, g_classes));
		} else if (!g_classes.includes(klass)) {
			$$invalidate(1, g_classes = g_classes.split(' ').concat([klass]).join(' '));
		} else {
			let n_classes = g_classes.split(' ');
			n_classes.splice(n_classes.indexOf(klass), 1);
			$$invalidate(1, g_classes = n_classes.join(' '));
		}

		initEClasses();
	}

	function mousedown_handler(event) {
		bubble.call(this, $$self, event);
	}

	const mousedown_handler_1 = () => toggle(STYLE.ITALIC);
	const mousedown_handler_2 = () => toggle(STYLE.UNDERLINE);
	const mousedown_handler_3 = () => toggle(STYLE.LINETHROUGH);
	const mousedown_handler_4 = () => toggle(STYLE.CODE);
	const mousedown_handler_5 = () => toggleG(STYLE.JUSTIFY);
	const select_handler = evt => toggleG(evt.detail);
	const select_handler_1 = evt => toggleG(evt.detail);

	$$self.$$set = $$props => {
		if ('setClass' in $$props) $$invalidate(2, setClass = $$props.setClass);
		if ('setGClass' in $$props) $$invalidate(3, setGClass = $$props.setGClass);
		if ('classes' in $$props) $$invalidate(0, classes = $$props.classes);
		if ('g_classes' in $$props) $$invalidate(1, g_classes = $$props.g_classes);
		if ('href' in $$props) $$invalidate(4, href = $$props.href);
		if ('blank' in $$props) $$invalidate(5, blank = $$props.blank);
		if ('base_node' in $$props) $$invalidate(14, base_node = $$props.base_node);
		if ('mouseX' in $$props) $$invalidate(13, mouseX = $$props.mouseX);
	};

	return [
		classes,
		g_classes,
		setClass,
		setGClass,
		href,
		blank,
		e_classes,
		setPosition,
		close,
		toggle,
		toggleBold,
		togglePadding,
		toggleG,
		mouseX,
		base_node,
		mousedown_handler,
		mousedown_handler_1,
		mousedown_handler_2,
		mousedown_handler_3,
		mousedown_handler_4,
		mousedown_handler_5,
		select_handler,
		select_handler_1
	];
}

class ToolBar extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$w, create_fragment$I, safe_not_equal, {
			setClass: 2,
			setGClass: 3,
			classes: 0,
			g_classes: 1,
			href: 4,
			blank: 5,
			base_node: 14,
			mouseX: 13
		});
	}
}

/* ../tailwind-editor/src/Icons/FloatCenter.svelte generated by Svelte v3.55.0 */

function create_fragment$H(ctx) {
	let svg;
	let path;
	let svg_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M9 7h6v6H9V7M3 3h18v2H3V3m0 12h18v2H3v-2m0 4h14v2H3v-2Z");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", svg_class_value = "p-1 w-8 h-8 shrink-0 " + (/*selected*/ ctx[0] ? 'bg-blue-200' : '') + " cursor-pointer");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);

			if (!mounted) {
				dispose = listen(svg, "click", /*click_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*selected*/ 1 && svg_class_value !== (svg_class_value = "p-1 w-8 h-8 shrink-0 " + (/*selected*/ ctx[0] ? 'bg-blue-200' : '') + " cursor-pointer")) {
				attr(svg, "class", svg_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
			mounted = false;
			dispose();
		}
	};
}

function instance$v($$self, $$props, $$invalidate) {
	let { selected = false } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
	};

	return [selected, click_handler];
}

class FloatCenter extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$v, create_fragment$H, safe_not_equal, { selected: 0 });
	}
}

/* ../tailwind-editor/src/Icons/FloatLeft.svelte generated by Svelte v3.55.0 */

function create_fragment$G(ctx) {
	let svg;
	let path;
	let svg_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M3 7h6v6H3V7m0-4h18v2H3V3m18 4v2H11V7h10m0 4v2H11v-2h10M3 15h14v2H3v-2m0 4h18v2H3v-2Z");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", svg_class_value = "w-8 shrink-0 h-8 p-1 " + (/*selected*/ ctx[0] ? 'bg-blue-200' : '') + " cursor-pointer");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);

			if (!mounted) {
				dispose = listen(svg, "click", /*click_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*selected*/ 1 && svg_class_value !== (svg_class_value = "w-8 shrink-0 h-8 p-1 " + (/*selected*/ ctx[0] ? 'bg-blue-200' : '') + " cursor-pointer")) {
				attr(svg, "class", svg_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
			mounted = false;
			dispose();
		}
	};
}

function instance$u($$self, $$props, $$invalidate) {
	let { selected = false } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
	};

	return [selected, click_handler];
}

class FloatLeft extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$u, create_fragment$G, safe_not_equal, { selected: 0 });
	}
}

/* ../tailwind-editor/src/Icons/FloatRight.svelte generated by Svelte v3.55.0 */

function create_fragment$F(ctx) {
	let svg;
	let path;
	let svg_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M15 7h6v6h-6V7M3 3h18v2H3V3m10 4v2H3V7h10m-4 4v2H3v-2h6m-6 4h14v2H3v-2m0 4h18v2H3v-2Z");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", svg_class_value = "w-8 h-8 shrink-0 p-1 " + (/*selected*/ ctx[0] ? 'bg-blue-200' : '') + " cursor-pointer");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);

			if (!mounted) {
				dispose = listen(svg, "click", /*click_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*selected*/ 1 && svg_class_value !== (svg_class_value = "w-8 h-8 shrink-0 p-1 " + (/*selected*/ ctx[0] ? 'bg-blue-200' : '') + " cursor-pointer")) {
				attr(svg, "class", svg_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
			mounted = false;
			dispose();
		}
	};
}

function instance$t($$self, $$props, $$invalidate) {
	let { selected = false } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
	};

	return [selected, click_handler];
}

class FloatRight extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$t, create_fragment$F, safe_not_equal, { selected: 0 });
	}
}

/* ../tailwind-editor/src/ToolBar/MediaInput.svelte generated by Svelte v3.55.0 */

function get_each_context$8(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[36] = list[i];
	return child_ctx;
}

function get_each_context_1$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[39] = list[i];
	return child_ctx;
}

// (159:4) {#if src}
function create_if_block_2$6(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "type", "text");
			attr(input, "placeholder", "Image src");
			attr(input, "class", "bg-gray-100 text-sm font-mono mb-2 border p-1 w-64 rounded-sm outline-none shadow-inner");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*src*/ ctx[1]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[22]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*src*/ 2 && input.value !== /*src*/ ctx[1]) {
				set_input_value(input, /*src*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

// (167:4) {#if media_type == "IMG"}
function create_if_block_1$9(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "type", "text");
			attr(input, "placeholder", "Image alt");
			attr(input, "class", "bg-gray-100 text-sm font-mono mb-2 border p-1 w-64 rounded-sm outline-none shadow-inner");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*alt*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler_1*/ ctx[23]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*alt*/ 1 && input.value !== /*alt*/ ctx[0]) {
				set_input_value(input, /*alt*/ ctx[0]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

// (194:20) {#each SIZES as w}
function create_each_block_1$4(ctx) {
	let option;
	let t_value = /*w*/ ctx[39] + "";
	let t;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = "w-" + /*w*/ ctx[39];
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (207:20) {#each SIZES as h}
function create_each_block$8(ctx) {
	let option;
	let t_value = /*h*/ ctx[36] + "";
	let t;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = "h-" + /*h*/ ctx[36];
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (224:4) {#if media_type == "VIDEO"}
function create_if_block$m(ctx) {
	let div;
	let label0;
	let input0;
	let t0;
	let t1;
	let label1;
	let input1;
	let t2;
	let t3;
	let label2;
	let input2;
	let t4;
	let t5;
	let label3;
	let input3;
	let t6;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			label0 = element("label");
			input0 = element("input");
			t0 = text("\n                Autoplay");
			t1 = space();
			label1 = element("label");
			input1 = element("input");
			t2 = text("\n                Muted");
			t3 = space();
			label2 = element("label");
			input2 = element("input");
			t4 = text("\n                Loop");
			t5 = space();
			label3 = element("label");
			input3 = element("input");
			t6 = text("\n                Controls");
			attr(input0, "class", "mr-2");
			attr(input0, "type", "checkbox");
			attr(label0, "class", "flex items-center");
			attr(input1, "class", "mr-2");
			attr(input1, "type", "checkbox");
			attr(label1, "class", "flex items-center");
			attr(input2, "class", "mr-2");
			attr(input2, "type", "checkbox");
			attr(label2, "class", "flex items-center");
			attr(input3, "class", "mr-2");
			attr(input3, "type", "checkbox");
			attr(label3, "class", "flex items-center");
			attr(div, "class", "text-xs my-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, label0);
			append(label0, input0);
			input0.checked = /*opts*/ ctx[2].autoplay;
			append(label0, t0);
			append(div, t1);
			append(div, label1);
			append(label1, input1);
			input1.checked = /*opts*/ ctx[2].muted;
			append(label1, t2);
			append(div, t3);
			append(div, label2);
			append(label2, input2);
			input2.checked = /*opts*/ ctx[2].loop;
			append(label2, t4);
			append(div, t5);
			append(div, label3);
			append(label3, input3);
			input3.checked = /*opts*/ ctx[2].controls;
			append(label3, t6);

			if (!mounted) {
				dispose = [
					listen(input0, "change", /*input0_change_handler*/ ctx[27]),
					listen(input1, "change", /*input1_change_handler*/ ctx[28]),
					listen(input2, "change", /*input2_change_handler*/ ctx[29]),
					listen(input3, "change", /*input3_change_handler*/ ctx[30])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*opts*/ 4) {
				input0.checked = /*opts*/ ctx[2].autoplay;
			}

			if (dirty[0] & /*opts*/ 4) {
				input1.checked = /*opts*/ ctx[2].muted;
			}

			if (dirty[0] & /*opts*/ 4) {
				input2.checked = /*opts*/ ctx[2].loop;
			}

			if (dirty[0] & /*opts*/ 4) {
				input3.checked = /*opts*/ ctx[2].controls;
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$E(ctx) {
	let div9;
	let t0;
	let t1;
	let div7;
	let div1;
	let floatleft;
	let t2;
	let floatcenter;
	let t3;
	let floatright;
	let t4;
	let div0;
	let spacing;
	let t5;
	let div6;
	let div3;
	let div2;
	let t7;
	let select0;
	let t8;
	let div5;
	let div4;
	let t10;
	let select1;
	let t11;
	let t12;
	let div8;
	let button0;
	let t14;
	let button1;
	let t16;
	let button2;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*src*/ ctx[1] && create_if_block_2$6(ctx);
	let if_block1 = /*media_type*/ ctx[5] == "IMG" && create_if_block_1$9(ctx);

	floatleft = new FloatLeft({
			props: {
				selected: /*selectedAlign*/ ctx[8] === "left"
			}
		});

	floatleft.$on("click", /*setFLeft*/ ctx[11]);

	floatcenter = new FloatCenter({
			props: {
				selected: /*selectedAlign*/ ctx[8] === "center"
			}
		});

	floatcenter.$on("click", /*setFCenter*/ ctx[12]);

	floatright = new FloatRight({
			props: {
				selected: /*selectedAlign*/ ctx[8] === "right"
			}
		});

	floatright.$on("click", /*setFRight*/ ctx[13]);

	spacing = new Spacing({
			props: {
				mp: "m",
				title: "Margin",
				g_classes: /*klass*/ ctx[3]
			}
		});

	spacing.$on("select", /*select_handler*/ ctx[24]);
	let each_value_1 = SIZES;
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$4(get_each_context_1$4(ctx, each_value_1, i));
	}

	let each_value = SIZES;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
	}

	let if_block2 = /*media_type*/ ctx[5] == "VIDEO" && create_if_block$m(ctx);

	return {
		c() {
			div9 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			div7 = element("div");
			div1 = element("div");
			create_component(floatleft.$$.fragment);
			t2 = space();
			create_component(floatcenter.$$.fragment);
			t3 = space();
			create_component(floatright.$$.fragment);
			t4 = space();
			div0 = element("div");
			create_component(spacing.$$.fragment);
			t5 = space();
			div6 = element("div");
			div3 = element("div");
			div2 = element("div");
			div2.textContent = "Width:";
			t7 = space();
			select0 = element("select");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t8 = space();
			div5 = element("div");
			div4 = element("div");
			div4.textContent = "Height:";
			t10 = space();
			select1 = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t11 = space();
			if (if_block2) if_block2.c();
			t12 = space();
			div8 = element("div");
			button0 = element("button");
			button0.textContent = "Cancel";
			t14 = space();
			button1 = element("button");
			button1.textContent = "Delete";
			t16 = space();
			button2 = element("button");
			button2.textContent = "Update";
			attr(div0, "class", "h-full");
			attr(div1, "class", "flex shrink-0");
			attr(div2, "class", "w-10");
			attr(select0, "class", "focus:outline-none border");
			if (/*mwidth*/ ctx[6] === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[25].call(select0));
			attr(div3, "class", "flex items-center space-x-1 text-xs");
			attr(div4, "class", "w-10");
			attr(select1, "class", "focus:outline-none border");
			if (/*mheight*/ ctx[7] === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[26].call(select1));
			attr(div5, "class", "flex items-center space-x-1 mt-1 text-xs");
			attr(div7, "class", "my-2 flex justify-between items-center");
			attr(button0, "class", "hover:bg-gray-300 px-3 rounded-sm outline-none text-xs py-1");
			attr(button1, "class", "hover:bg-red-700 px-3 rounded-sm outline-none mx-2 bg-red-600 text-red-100 text-xs py-1");
			attr(button2, "class", "ml-2 hover:bg-blue-700 bg-blue-600 text-blue-100 px-3 rounded-sm outline-none text-xs py-1");
			attr(div8, "class", "flex items-center justify-end mt-2");
			attr(div9, "class", "absolute -mt-6 p-3 shadow-xl flex flex-col rounded text-black bg-white z-940 z-40");
		},
		m(target, anchor) {
			insert(target, div9, anchor);
			if (if_block0) if_block0.m(div9, null);
			append(div9, t0);
			if (if_block1) if_block1.m(div9, null);
			append(div9, t1);
			append(div9, div7);
			append(div7, div1);
			mount_component(floatleft, div1, null);
			append(div1, t2);
			mount_component(floatcenter, div1, null);
			append(div1, t3);
			mount_component(floatright, div1, null);
			append(div1, t4);
			append(div1, div0);
			mount_component(spacing, div0, null);
			append(div7, t5);
			append(div7, div6);
			append(div6, div3);
			append(div3, div2);
			append(div3, t7);
			append(div3, select0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(select0, null);
			}

			select_option(select0, /*mwidth*/ ctx[6]);
			append(div6, t8);
			append(div6, div5);
			append(div5, div4);
			append(div5, t10);
			append(div5, select1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select1, null);
			}

			select_option(select1, /*mheight*/ ctx[7]);
			append(div9, t11);
			if (if_block2) if_block2.m(div9, null);
			append(div9, t12);
			append(div9, div8);
			append(div8, button0);
			append(div8, t14);
			append(div8, button1);
			append(div8, t16);
			append(div8, button2);
			current = true;

			if (!mounted) {
				dispose = [
					listen(select0, "change", /*select0_change_handler*/ ctx[25]),
					listen(select0, "change", /*setClass*/ ctx[9]),
					listen(select0, "blur", /*setClass*/ ctx[9]),
					listen(select1, "change", /*select1_change_handler*/ ctx[26]),
					listen(select1, "change", /*setClass*/ ctx[9]),
					listen(select1, "blur", /*setClass*/ ctx[9]),
					listen(button0, "click", /*cancelMedia*/ ctx[15]),
					listen(button1, "click", function () {
						if (is_function(/*delMedia*/ ctx[4])) /*delMedia*/ ctx[4].apply(this, arguments);
					}),
					listen(button2, "click", /*click_handler*/ ctx[31]),
					listen(div9, "mousedown", stop_propagation(/*mousedown_handler*/ ctx[21])),
					action_destroyer(/*setPosition*/ ctx[16].call(null, div9))
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (/*src*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2$6(ctx);
					if_block0.c();
					if_block0.m(div9, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*media_type*/ ctx[5] == "IMG") {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1$9(ctx);
					if_block1.c();
					if_block1.m(div9, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			const floatleft_changes = {};
			if (dirty[0] & /*selectedAlign*/ 256) floatleft_changes.selected = /*selectedAlign*/ ctx[8] === "left";
			floatleft.$set(floatleft_changes);
			const floatcenter_changes = {};
			if (dirty[0] & /*selectedAlign*/ 256) floatcenter_changes.selected = /*selectedAlign*/ ctx[8] === "center";
			floatcenter.$set(floatcenter_changes);
			const floatright_changes = {};
			if (dirty[0] & /*selectedAlign*/ 256) floatright_changes.selected = /*selectedAlign*/ ctx[8] === "right";
			floatright.$set(floatright_changes);
			const spacing_changes = {};
			if (dirty[0] & /*klass*/ 8) spacing_changes.g_classes = /*klass*/ ctx[3];
			spacing.$set(spacing_changes);

			if (dirty & /*SIZES*/ 0) {
				each_value_1 = SIZES;
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$4(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$4(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(select0, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty[0] & /*mwidth*/ 64) {
				select_option(select0, /*mwidth*/ ctx[6]);
			}

			if (dirty & /*SIZES*/ 0) {
				each_value = SIZES;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$8(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$8(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty[0] & /*mheight*/ 128) {
				select_option(select1, /*mheight*/ ctx[7]);
			}

			if (/*media_type*/ ctx[5] == "VIDEO") {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block$m(ctx);
					if_block2.c();
					if_block2.m(div9, t12);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(floatleft.$$.fragment, local);
			transition_in(floatcenter.$$.fragment, local);
			transition_in(floatright.$$.fragment, local);
			transition_in(spacing.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(floatleft.$$.fragment, local);
			transition_out(floatcenter.$$.fragment, local);
			transition_out(floatright.$$.fragment, local);
			transition_out(spacing.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div9);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			destroy_component(floatleft);
			destroy_component(floatcenter);
			destroy_component(floatright);
			destroy_component(spacing);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			if (if_block2) if_block2.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function firstParentRelative(n) {
	while (n.parentNode && n.parentNode.tagName) {
		n = n.parentNode;

		if (window.getComputedStyle(n).getPropertyValue("position").toLowerCase() == "relative") {
			return n.getBoundingClientRect();
		}
	}

	return { top: -window.scrollY, left: 0 };
}

function instance$s($$self, $$props, $$invalidate) {
	let { alt } = $$props;
	let { src } = $$props;
	let { opts } = $$props;
	let { klass = "" } = $$props;
	let { setMedia } = $$props;
	let { delMedia } = $$props;
	let { cancel } = $$props;
	let { media_type } = $$props;
	let wmatch = klass.match(/w-\d+/);
	let hmatch = klass.match(/h-\d+/);
	let mwidth = wmatch?.[0] ?? "w-auto";
	let mheight = hmatch?.[0] ?? "h-auto";

	let selectedAlign = klass.includes("justify-end")
	? "right"
	: klass.includes("flex justify-center")
		? "center"
		: klass.includes("flex") ? "left" : "";

	let posClass = selectedAlign === "left"
	? "flex items-start"
	: selectedAlign === "right"
		? "flex justify-end items-start"
		: selectedAlign === "center"
			? "flex justify-center items-start"
			: "";

	let marginClass = klass.replace(/(flex.+start|w-[\w\.]+)/g, "");

	function setClass() {
		$$invalidate(3, klass = `${posClass} ${mheight} ${mwidth} ${marginClass}`);
		addMedia(true);
	}

	function setMargin(c) {
		const reg = new RegExp(c.split("-")[0] + "-\\w+");
		marginClass = marginClass.replace(reg, "");
		marginClass += " " + c;
		setClass();
	}

	function setFLeft() {
		// if it's already left - remove
		if (selectedAlign === "left") {
			$$invalidate(8, selectedAlign = "");
			posClass = "";
		} else {
			posClass = "flex items-start";
			$$invalidate(8, selectedAlign = "left");
		}

		setClass();
	}

	function setFCenter() {
		if (selectedAlign === "center") {
			$$invalidate(8, selectedAlign = "");
			posClass = "";
		} else {
			posClass = "flex justify-center items-start";
			$$invalidate(8, selectedAlign = "center");
		}

		setClass();
	}

	function setFRight() {
		if (selectedAlign === "right") {
			$$invalidate(8, selectedAlign = "");
			posClass = "";
		} else {
			posClass = "flex justify-end items-start";
			$$invalidate(8, selectedAlign = "right");
		}

		setClass();
	}

	async function addMedia(update = false) {
		let is_img = await Util.testImgUrl(src.trim());
		let is_video = Util.testVideoUrl(src.trim());
		let iframe_vid = Util.parseYouTube(src.trim()) || Util.parseVimeo(src.trim());

		if (is_img || is_video || iframe_vid) {
			setMedia(
				{
					src: iframe_vid || src,
					klass,
					alt,
					opts,
					media_type: is_img
					? "IMG"
					: is_video ? "VIDEO" : iframe_vid ? "IFRAME" : "AUDIO"
				},
				update
			);
		}
	}

	function cancelMedia() {
		cancel();
	}

	let { mouseX } = $$props;
	let { base_node } = $$props;

	function setPosition(node) {
		if (!base_node) return;

		let elm = base_node.parentNode.tagName == "DIV"
		? base_node
		: base_node.parentNode;

		let rect = elm.parentNode.getBoundingClientRect();
		let posY = rect.top;

		if (elm.previousElementSibling) {
			let ch_nodes = [...elm.parentNode.childNodes];
			let siblings = ch_nodes.slice(0, ch_nodes.indexOf(elm) + 1);
			let br = siblings.reverse().find(elm => elm.tagName == "BR");

			if (br) {
				rect = br.getBoundingClientRect();
				posY = rect.top ? rect.top : posY;
			}
		}

		// node.style.top = `${posY+window.scrollY}px`
		let rel_rect = firstParentRelative(node);

		let pos_top = posY - rel_rect.top;
		if (posY < 30) pos_top = 30;
		node.style.top = `${pos_top}px`;
		$$invalidate(17, mouseX = mouseX || 10);
		let mx = mouseX - node.offsetWidth / 2;
		mx = mx > 0 ? mx : 10;

		mx = mouseX + node.offsetWidth / 2 < window.innerWidth
		? mx
		: window.innerWidth - node.offsetWidth;

		node.style.left = `${mx - rel_rect.left}px`;
	}

	function mousedown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function input_input_handler() {
		src = this.value;
		$$invalidate(1, src);
	}

	function input_input_handler_1() {
		alt = this.value;
		$$invalidate(0, alt);
	}

	const select_handler = evt => setMargin(evt.detail);

	function select0_change_handler() {
		mwidth = select_value(this);
		$$invalidate(6, mwidth);
	}

	function select1_change_handler() {
		mheight = select_value(this);
		$$invalidate(7, mheight);
	}

	function input0_change_handler() {
		opts.autoplay = this.checked;
		$$invalidate(2, opts);
	}

	function input1_change_handler() {
		opts.muted = this.checked;
		$$invalidate(2, opts);
	}

	function input2_change_handler() {
		opts.loop = this.checked;
		$$invalidate(2, opts);
	}

	function input3_change_handler() {
		opts.controls = this.checked;
		$$invalidate(2, opts);
	}

	const click_handler = () => addMedia();

	$$self.$$set = $$props => {
		if ('alt' in $$props) $$invalidate(0, alt = $$props.alt);
		if ('src' in $$props) $$invalidate(1, src = $$props.src);
		if ('opts' in $$props) $$invalidate(2, opts = $$props.opts);
		if ('klass' in $$props) $$invalidate(3, klass = $$props.klass);
		if ('setMedia' in $$props) $$invalidate(18, setMedia = $$props.setMedia);
		if ('delMedia' in $$props) $$invalidate(4, delMedia = $$props.delMedia);
		if ('cancel' in $$props) $$invalidate(19, cancel = $$props.cancel);
		if ('media_type' in $$props) $$invalidate(5, media_type = $$props.media_type);
		if ('mouseX' in $$props) $$invalidate(17, mouseX = $$props.mouseX);
		if ('base_node' in $$props) $$invalidate(20, base_node = $$props.base_node);
	};

	return [
		alt,
		src,
		opts,
		klass,
		delMedia,
		media_type,
		mwidth,
		mheight,
		selectedAlign,
		setClass,
		setMargin,
		setFLeft,
		setFCenter,
		setFRight,
		addMedia,
		cancelMedia,
		setPosition,
		mouseX,
		setMedia,
		cancel,
		base_node,
		mousedown_handler,
		input_input_handler,
		input_input_handler_1,
		select_handler,
		select0_change_handler,
		select1_change_handler,
		input0_change_handler,
		input1_change_handler,
		input2_change_handler,
		input3_change_handler,
		click_handler
	];
}

class MediaInput extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$s,
			create_fragment$E,
			safe_not_equal,
			{
				alt: 0,
				src: 1,
				opts: 2,
				klass: 3,
				setMedia: 18,
				delMedia: 4,
				cancel: 19,
				media_type: 5,
				mouseX: 17,
				base_node: 20
			},
			null,
			[-1, -1]
		);
	}
}

function cln(c){
    return JSON.parse(JSON.stringify(c))
}

var EditorHistory = {
    arr: [],
    i: -1,
    add(c){
        this.arr[++this.i] = cln(c);
        // if(this.i >= this.arr.length-1 && this.arr.length){
        //     this.arr.splice(this.i-1, this.arr.length-this.i-1)
        // }
    },
    // update current when inserting texts
    update(c){
        this.arr[this.i] = cln(c);
    },
    prev(){
        if(this.i == 0) return cln(this.arr[0])
        return cln(this.arr[--this.i])
    },
    next(){
        if(this.i >= this.arr.length-1) return cln(this.arr[this.arr.length-1])
        return cln(this.arr[++this.i])
    },
};

/* ../tailwind-editor/src/Editor/Editor.svelte generated by Svelte v3.55.0 */

function get_each_context$7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[46] = list[i];
	child_ctx[47] = list;
	child_ctx[48] = i;
	return child_ctx;
}

// (259:0) {#if show_toolbar && editable}
function create_if_block_1$8(ctx) {
	let toolbar;
	let current;

	toolbar = new ToolBar({
			props: {
				setGClass: /*setGClass*/ ctx[4],
				setClass: /*setClass*/ ctx[3],
				base_node: /*base_node*/ ctx[5],
				g_classes: /*g_classes*/ ctx[7],
				classes: /*classes*/ ctx[6],
				href: /*href*/ ctx[8],
				blank: /*blank*/ ctx[9],
				mouseX: /*mouseX*/ ctx[10]
			}
		});

	toolbar.$on("close", /*hideSelect*/ ctx[16]);

	return {
		c() {
			create_component(toolbar.$$.fragment);
		},
		m(target, anchor) {
			mount_component(toolbar, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const toolbar_changes = {};
			if (dirty[0] & /*setGClass*/ 16) toolbar_changes.setGClass = /*setGClass*/ ctx[4];
			if (dirty[0] & /*setClass*/ 8) toolbar_changes.setClass = /*setClass*/ ctx[3];
			if (dirty[0] & /*base_node*/ 32) toolbar_changes.base_node = /*base_node*/ ctx[5];
			if (dirty[0] & /*g_classes*/ 128) toolbar_changes.g_classes = /*g_classes*/ ctx[7];
			if (dirty[0] & /*classes*/ 64) toolbar_changes.classes = /*classes*/ ctx[6];
			if (dirty[0] & /*href*/ 256) toolbar_changes.href = /*href*/ ctx[8];
			if (dirty[0] & /*blank*/ 512) toolbar_changes.blank = /*blank*/ ctx[9];
			if (dirty[0] & /*mouseX*/ 1024) toolbar_changes.mouseX = /*mouseX*/ ctx[10];
			toolbar.$set(toolbar_changes);
		},
		i(local) {
			if (current) return;
			transition_in(toolbar.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(toolbar.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(toolbar, detaching);
		}
	};
}

// (272:0) {#if show_media && editable}
function create_if_block$l(ctx) {
	let mediainput;
	let current;

	const mediainput_spread_levels = [
		{ setMedia: /*addMedia*/ ctx[20] },
		{ delMedia: /*rmMedia*/ ctx[21] },
		{ cancel: /*func*/ ctx[31] },
		{ base_node: /*base_node*/ ctx[5] },
		/*img_props*/ ctx[12],
		{ mouseX: /*mouseX*/ ctx[10] }
	];

	let mediainput_props = {};

	for (let i = 0; i < mediainput_spread_levels.length; i += 1) {
		mediainput_props = assign(mediainput_props, mediainput_spread_levels[i]);
	}

	mediainput = new MediaInput({ props: mediainput_props });

	return {
		c() {
			create_component(mediainput.$$.fragment);
		},
		m(target, anchor) {
			mount_component(mediainput, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const mediainput_changes = (dirty[0] & /*addMedia, rmMedia, show_media, base_node, img_props, mouseX*/ 3152928)
			? get_spread_update(mediainput_spread_levels, [
					dirty[0] & /*addMedia*/ 1048576 && { setMedia: /*addMedia*/ ctx[20] },
					dirty[0] & /*rmMedia*/ 2097152 && { delMedia: /*rmMedia*/ ctx[21] },
					dirty[0] & /*show_media*/ 2048 && { cancel: /*func*/ ctx[31] },
					dirty[0] & /*base_node*/ 32 && { base_node: /*base_node*/ ctx[5] },
					dirty[0] & /*img_props*/ 4096 && get_spread_object(/*img_props*/ ctx[12]),
					dirty[0] & /*mouseX*/ 1024 && { mouseX: /*mouseX*/ ctx[10] }
				])
			: {};

			mediainput.$set(mediainput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(mediainput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(mediainput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(mediainput, detaching);
		}
	};
}

// (277:2) {#each arr_html as h, i}
function create_each_block$7(ctx) {
	let contenteditor;
	let updating_html;
	let updating_gklass;
	let current;

	function contenteditor_html_binding(value) {
		/*contenteditor_html_binding*/ ctx[32](value, /*h*/ ctx[46]);
	}

	function contenteditor_gklass_binding(value) {
		/*contenteditor_gklass_binding*/ ctx[33](value, /*h*/ ctx[46]);
	}

	function enter_handler(...args) {
		return /*enter_handler*/ ctx[34](/*i*/ ctx[48], ...args);
	}

	function merge_prev_handler(...args) {
		return /*merge_prev_handler*/ ctx[35](/*i*/ ctx[48], ...args);
	}

	function merge_next_handler(...args) {
		return /*merge_next_handler*/ ctx[36](/*i*/ ctx[48], ...args);
	}

	function pasteTxt_handler(...args) {
		return /*pasteTxt_handler*/ ctx[37](/*i*/ ctx[48], ...args);
	}

	let contenteditor_props = {
		editable: /*editable*/ ctx[1],
		custom: !!/*h*/ ctx[46].custom
	};

	if (/*h*/ ctx[46].html !== void 0) {
		contenteditor_props.html = /*h*/ ctx[46].html;
	}

	if (/*h*/ ctx[46].klass !== void 0) {
		contenteditor_props.gklass = /*h*/ ctx[46].klass;
	}

	contenteditor = new ContentEditor({ props: contenteditor_props });
	binding_callbacks.push(() => bind(contenteditor, 'html', contenteditor_html_binding, /*h*/ ctx[46].html));
	binding_callbacks.push(() => bind(contenteditor, 'gklass', contenteditor_gklass_binding, /*h*/ ctx[46].klass));
	contenteditor.$on("back", /*prevHistory*/ ctx[26]);
	contenteditor.$on("forward", /*nextHistory*/ ctx[27]);
	contenteditor.$on("enter", enter_handler);
	contenteditor.$on("merge_prev", merge_prev_handler);
	contenteditor.$on("merge_next", merge_next_handler);
	contenteditor.$on("select", /*showToolBar*/ ctx[15]);
	contenteditor.$on("hideselect", /*hideSelect*/ ctx[16]);
	contenteditor.$on("set_media", /*setMediaInfo*/ ctx[19]);
	contenteditor.$on("input", /*contentUpdated*/ ctx[23]);
	contenteditor.$on("changeClass", /*triggerUpdateClass*/ ctx[25]);
	contenteditor.$on("blur", /*triggerUpdate*/ ctx[24]);
	contenteditor.$on("update", /*triggerUpdate*/ ctx[24]);
	contenteditor.$on("pasteTxt", pasteTxt_handler);

	return {
		c() {
			create_component(contenteditor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(contenteditor, target, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const contenteditor_changes = {};
			if (dirty[0] & /*editable*/ 2) contenteditor_changes.editable = /*editable*/ ctx[1];
			if (dirty[0] & /*arr_html*/ 1) contenteditor_changes.custom = !!/*h*/ ctx[46].custom;

			if (!updating_html && dirty[0] & /*arr_html*/ 1) {
				updating_html = true;
				contenteditor_changes.html = /*h*/ ctx[46].html;
				add_flush_callback(() => updating_html = false);
			}

			if (!updating_gklass && dirty[0] & /*arr_html*/ 1) {
				updating_gklass = true;
				contenteditor_changes.gklass = /*h*/ ctx[46].klass;
				add_flush_callback(() => updating_gklass = false);
			}

			contenteditor.$set(contenteditor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(contenteditor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(contenteditor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(contenteditor, detaching);
		}
	};
}

function create_fragment$D(ctx) {
	let t0;
	let t1;
	let div;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*show_toolbar*/ ctx[2] && /*editable*/ ctx[1] && create_if_block_1$8(ctx);
	let if_block1 = /*show_media*/ ctx[11] && /*editable*/ ctx[1] && create_if_block$l(ctx);
	let each_value = /*arr_html*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "key", "ed");
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t0, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, t1, anchor);
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(window, "mousedown", /*triggerChange*/ ctx[22]),
					action_destroyer(/*setListEditors*/ ctx[14].call(null, div))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*show_toolbar*/ ctx[2] && /*editable*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*show_toolbar, editable*/ 6) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1$8(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*show_media*/ ctx[11] && /*editable*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*show_media, editable*/ 2050) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$l(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(t1.parentNode, t1);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (dirty[0] & /*editable, arr_html, prevHistory, nextHistory, addNewElm, mergePrev, mergeNext, showToolBar, hideSelect, setMediaInfo, contentUpdated, triggerUpdateClass, triggerUpdate, pasteTxt*/ 529506307) {
				each_value = /*arr_html*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$7(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$7(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t0);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(t1);
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

function getParentEditor(target) {
	while (!target.dataset.editor && target.parentNode && target.parentNode.tagName) {
		target = target.parentNode;
	}

	// if target found
	if (target.dataset.editor) {
		return target;
	}

	return false;
}

function instance$r($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { arr_html = [{ html: ``, klass: "p-2" }] } = $$props;
	let { editable = false } = $$props;
	let { html = "" } = $$props;
	let { uid = null } = $$props;
	EditorHistory.add(arr_html);

	async function addNewElm(i, evt) {
		// split
		// get element index
		let target = evt.detail.target;

		let pchildren = [...target.parentNode.children];
		let index = pchildren.indexOf(target);

		arr_html.splice(
			i,
			1,
			{
				html: evt.detail.html, //evt.detail.klass
				klass: evt.detail.klass,
				custom: arr_html[i].custom
			},
			{ html: evt.detail.next_html, klass: '' }
		); //evt.detail.klass

		// auto focus
		$$invalidate(0, arr_html);

		await new Promise(r => setTimeout(r));
		let div_editors = [...target.parentNode.children]; //GET children again after timeout refresh!

		// next element
		let j = 1;

		while (div_editors[index + j] && !div_editors[index + j].getAttribute('contenteditable')) {
			j++;
		}

		div_editors[index + j]?.focus();
		historyChange();
	}

	function historyChange() {
		setTimeout(() => {
			EditorHistory.add(arr_html);
		});

		disaptchChange();
	}

	function setListEditors(node) {
	}

	let show_toolbar = false;
	let setClass;
	let setGClass;
	let base_node;
	let classes;
	let g_classes;
	let href;
	let blank;
	let mouseX;

	function showToolBar(evt) {
		$$invalidate(5, base_node = evt.detail.base_node);
		if (!base_node || base_node.tagName == "DIV") return;
		$$invalidate(2, show_toolbar = true);
		$$invalidate(3, setClass = evt.detail.setClass);
		$$invalidate(4, setGClass = evt.detail.setGClass);
		$$invalidate(6, classes = evt.detail.classes);
		$$invalidate(7, g_classes = evt.detail.g_classes);
		$$invalidate(8, href = evt.detail.href);
		$$invalidate(9, blank = evt.detail.blank);
		$$invalidate(10, mouseX = evt.detail.mouseX);
	}

	function hideSelect() {
		$$invalidate(2, show_toolbar = false);
	}

	function mergePrev(evt, i) {
		if (i > 0 && !arr_html[i - 1].custom) {
			$$invalidate(0, arr_html[i - 1].html += evt.detail, arr_html);
			arr_html.splice(i, 1);
			$$invalidate(0, arr_html[i - 1].custom = false, arr_html);
			$$invalidate(0, arr_html);
		}

		historyChange();
	}

	function mergeNext(evt, i) {
		if (i + 1 < arr_html.length && !arr_html[i + 1].custom) {
			$$invalidate(0, arr_html[i].html += arr_html[i + 1].html, arr_html);
			arr_html.splice(i + 1, 1);
			$$invalidate(0, arr_html[i].custom = false, arr_html);
			$$invalidate(0, arr_html);
		}

		historyChange();
	}

	let setMedia;
	let delMedia;
	let show_media = false;
	let img_props = {};

	function setMediaInfo(evt) {
		setMedia = evt.detail.setMedia;
		delMedia = evt.detail.delMedia;
		$$invalidate(5, base_node = evt.detail.base_node);

		$$invalidate(12, img_props = {
			alt: evt.detail.alt || '',
			src: evt.detail.src || '',
			opts: evt.detail.opts || {},
			klass: evt.detail.klass || '',
			media_type: evt.detail.media_type
		});

		$$invalidate(10, mouseX = evt.detail.mouseX);

		// show toolbar setmedia
		setMedia(img_props);

		$$invalidate(11, show_media = true);
	}

	function addMedia(img, update = false) {
		setMedia(img);
		if (!update) $$invalidate(11, show_media = false);
		disaptchChange();
	}

	function rmMedia() {
		delMedia();
		$$invalidate(11, show_media = false);
		disaptchChange();
	}

	function triggerChange(e) {
		$$invalidate(11, show_media = false);

		// trigger change if click is not on the current editor
		let pEditor = getParentEditor(e.target);

		if (!pEditor || pEditor.dataset.uid !== uid) {
			triggerUpdate();
			hideSelect();
		}
	}

	let updated = false;

	function contentUpdated(evt) {
		if (evt?.detail?.currentTarget) {
			if (!evt.detail.currentTarget.innerText) {
				// add history for first character
				EditorHistory.add(arr_html);
			} else {
				// update current history
				EditorHistory.update(arr_html);
			}
		}

		updated = true;
	}

	function triggerUpdate() {
		if (updated && !show_toolbar) {
			disaptchChange();
			EditorHistory.add(arr_html);
			updated = false;
		}
	}

	function triggerUpdateClass() {
		historyChange();
	}

	function disaptchChange() {
		setTimeout(() => {
			dispatch('change', { uid, arr_html });
		});
	}

	function prevHistory() {
		$$invalidate(0, arr_html = EditorHistory.prev());
	}

	function nextHistory() {
		$$invalidate(0, arr_html = EditorHistory.next());
	}

	const SIMPLE_ELMS = ['SPAN', 'EM', 'STRONG', 'SMALL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P']; // [TODO] finish this list! 

	async function pasteTxt(i, evt) {
		await new Promise(r => setTimeout(r));
		let chs = evt.detail.children;

		if (chs) {
			let arr_h = [];

			for (let ch of [...chs]) {
				if (ch.dataset?.uid?.startsWith("0x")) {
					ch = ch.children[0];

					for (let child of [...ch.children]) {
						arr_h.push({
							html: child.innerHTML,
							klass: child?.getAttribute('class') || ''
						});
					}
				} else if (ch.dataset.txteditor) {
					arr_h.push({
						html: ch.innerHTML,
						klass: ch.getAttribute('class')
					});
				} else {
					if (!ch.children.length) {
						arr_h.push({ html: ch.innerText, klass: "" });
					}
				}
			}

			if (arr_h.length) {
				if (i < arr_html.length) {
					$$invalidate(0, arr_html = arr_html.slice(0, i).concat(arr_h).concat(arr_html.slice(i + 1, arr_html.length)));
				} else {
					$$invalidate(0, arr_html = arr_html.slice(0, i).concat(arr_h));
				}
			} else {
				// wrap into a div or do nothing!
				if (chs.length) {
					$$invalidate(0, arr_html[i].custom = true, arr_html);
				}

				if (SIMPLE_ELMS.includes(chs?.[0]?.tagName)) {
					// wrap it in a div
					$$invalidate(0, arr_html[i].html = `<div>${chs[0].innerHTML}</div>`, arr_html);
				}

				$$invalidate(0, arr_html);
			}

			historyChange();
		}
	}

	const func = () => $$invalidate(11, show_media = false);

	function contenteditor_html_binding(value, h) {
		if ($$self.$$.not_equal(h.html, value)) {
			h.html = value;
			$$invalidate(0, arr_html);
		}
	}

	function contenteditor_gklass_binding(value, h) {
		if ($$self.$$.not_equal(h.klass, value)) {
			h.klass = value;
			$$invalidate(0, arr_html);
		}
	}

	const enter_handler = (i, evt) => addNewElm(i, evt);
	const merge_prev_handler = (i, evt) => mergePrev(evt, i);
	const merge_next_handler = (i, evt) => mergeNext(evt, i);
	const pasteTxt_handler = (i, evt) => pasteTxt(i, evt);

	$$self.$$set = $$props => {
		if ('arr_html' in $$props) $$invalidate(0, arr_html = $$props.arr_html);
		if ('editable' in $$props) $$invalidate(1, editable = $$props.editable);
		if ('html' in $$props) $$invalidate(29, html = $$props.html);
		if ('uid' in $$props) $$invalidate(30, uid = $$props.uid);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*arr_html*/ 1) {
			$$invalidate(29, html = arr_html.map(h => `<div class='${h.klass}'>${h.html}</div>`).join("\n"));
		}
	};

	return [
		arr_html,
		editable,
		show_toolbar,
		setClass,
		setGClass,
		base_node,
		classes,
		g_classes,
		href,
		blank,
		mouseX,
		show_media,
		img_props,
		addNewElm,
		setListEditors,
		showToolBar,
		hideSelect,
		mergePrev,
		mergeNext,
		setMediaInfo,
		addMedia,
		rmMedia,
		triggerChange,
		contentUpdated,
		triggerUpdate,
		triggerUpdateClass,
		prevHistory,
		nextHistory,
		pasteTxt,
		html,
		uid,
		func,
		contenteditor_html_binding,
		contenteditor_gklass_binding,
		enter_handler,
		merge_prev_handler,
		merge_next_handler,
		pasteTxt_handler
	];
}

class Editor extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$r,
			create_fragment$D,
			safe_not_equal,
			{
				arr_html: 0,
				editable: 1,
				html: 29,
				uid: 30
			},
			null,
			[-1, -1]
		);
	}
}

/* src/lib/ui/Icons/Icon.svelte generated by Svelte v3.55.0 */

function create_fragment$C(ctx) {
	let svg;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			svg = svg_element("svg");
			if (default_slot) default_slot.c();
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "w-5 h-5");
		},
		m(target, anchor) {
			insert(target, svg, anchor);

			if (default_slot) {
				default_slot.m(svg, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$q($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Icon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$q, create_fragment$C, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/TextIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$e(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "none");
			attr(path, "stroke", "currentColor");
			attr(path, "stroke-linecap", "round");
			attr(path, "stroke-linejoin", "round");
			attr(path, "stroke-width", "2");
			attr(path, "d", "M13 20h-1a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1M5 4h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5m8.1-12.1h6.8A2.18 2.18 0 0 1 22 10v4a2.11 2.11 0 0 1-2.1 2.1h-6.8m-8.3 0h-.7A2.18 2.18 0 0 1 2 14v-4a2.18 2.18 0 0 1 2.1-2.1h.7");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$B(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$e] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class TextIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$B, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/TextareaIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$d(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2M4 6v12h16V6H4m2 3h12v2H6V9m0 4h10v2H6v-2Z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$A(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$d] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class TextareaIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$A, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/NumberIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$c(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M19 19V5H5v14h14m0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-8 4h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2m0 2v6h2V9h-2Z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$z(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$c] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class NumberIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$z, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/EmailIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$b(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8s8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47c.65.89 1.77 1.47 2.96 1.47c1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$y(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$b] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class EmailIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$y, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/PasswordIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$a(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M6 22q-.825 0-1.412-.587Q4 20.825 4 20V10q0-.825.588-1.413Q5.175 8 6 8h1V6q0-2.075 1.463-3.538Q9.925 1 12 1t3.538 1.462Q17 3.925 17 6v2h1q.825 0 1.413.587Q20 9.175 20 10v10q0 .825-.587 1.413Q18.825 22 18 22Zm0-2h12V10H6v10Zm6-3q.825 0 1.413-.587Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.413Q11.175 17 12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6ZM6 20V10v10Z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$x(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$a] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class PasswordIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$x, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/DateIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$9(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M17 22v-3h-3v-2h3v-3h2v3h3v2h-3v3ZM5 20q-.825 0-1.413-.587Q3 18.825 3 18V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h6V2h2v2h1q.825 0 1.413.588Q19 5.175 19 6v6.1q-.5-.075-1-.075t-1 .075V10H5v8h7q0 .5.075 1t.275 1Z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$w(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$9] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class DateIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$w, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/TimeIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$8(ctx) {
	let path0;
	let path1;

	return {
		c() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			attr(path0, "fill", "currentColor");
			attr(path0, "d", "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z");
			attr(path1, "fill", "currentColor");
			attr(path1, "d", "M12.5 7H11v6l5.25 3.15l.75-1.23l-4.5-2.67z");
		},
		m(target, anchor) {
			insert(target, path0, anchor);
			insert(target, path1, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path0);
			if (detaching) detach(path1);
		}
	};
}

function create_fragment$v(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$8] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class TimeIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$v, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/DateTimeIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$7(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M21 11.11V5a2 2 0 0 0-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h6.11c1.26 1.24 2.98 2 4.89 2c3.87 0 7-3.13 7-7c0-1.91-.76-3.63-2-4.89M12 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M5 19V5h2v2h10V5h2v4.68c-.91-.43-1.92-.68-3-.68H7v2h4.1c-.6.57-1.06 1.25-1.42 2H7v2h2.08c-.05.33-.08.66-.08 1c0 1.08.25 2.09.68 3H5m11 2c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m.5-4.75l2.86 1.69l-.75 1.22L15 17v-5h1.5v4.25Z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$u(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$7] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class DateTimeIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$u, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/SelectIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$6(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M15 5h3l-1.5 2L15 5M5 2h14a2 2 0 0 1 2 2v16c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2m0 2v4h14V4H5m0 16h14V10H5v10m2-8h10v2H7v-2m0 4h10v2H7v-2Z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$t(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$6] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class SelectIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$t, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/MultichoiceIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$5(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M8.75 11.5h11.5a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1 0-1.5zm0 6h11.5a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1 0-1.5zm-5-12h10a.75.75 0 0 1 0 1.5h-10a.75.75 0 0 1 0-1.5zM5 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm-1 7a1 1 0 1 1 0-2a1 1 0 0 1 0 2zM19.309 7.918l-2.245-2.501A.25.25 0 0 1 17.25 5h4.49a.25.25 0 0 1 .185.417l-2.244 2.5a.25.25 0 0 1-.372 0z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$s(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$5] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class MultichoiceIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$s, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/RadioIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$4(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M12 17q2.075 0 3.538-1.463Q17 14.075 17 12t-1.462-3.538Q14.075 7 12 7Q9.925 7 8.463 8.462Q7 9.925 7 12q0 2.075 1.463 3.537Q9.925 17 12 17Zm0 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$r(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$4] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class RadioIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$r, safe_not_equal, {});
	}
}

/* src/lib/ui/Icons/CheckboxIcon.svelte generated by Svelte v3.55.0 */

function create_default_slot$3(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M19 19H5V5h10V3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8h-2m-11.09-.92L6.5 11.5L11 16L21 6l-1.41-1.42L11 13.17l-3.09-3.09Z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$q(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				$$slots: { default: [create_default_slot$3] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(icon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const icon_changes = {};

			if (dirty & /*$$scope*/ 1) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(icon, detaching);
		}
	};
}

class CheckboxIcon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$q, safe_not_equal, {});
	}
}

let required;
var inputs = () => [
  {
    label: "Text Input",
    type: "Text", // need to be the same component name
    value: "",
    props: {
      icon: TextIcon,
      arr_html: [
        { html: "Text", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Textarea",
    type: "Textarea",
    value: "",
    props: {
      icon: TextareaIcon,
      arr_html: [
        { html: "Paragraph", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        placeholder: "",
        rows: "5",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Number",
    type: "Number",
    value: "",
    props: {
      icon: NumberIcon,
      arr_html: [
        { html: "Number", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Email",
    type: "Email",
    value: "",
    props: {
      icon: EmailIcon,
      arr_html: [
        { html: "Email", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Password",
    value: "",
    type: "Password",
    props: {
      icon: PasswordIcon,
      arr_html: [
        { html: "Password", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Date",
    type: "Date",
    value: "",
    props: {
      icon: DateIcon,
      arr_html: [
        { html: "Date", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Time",
    type: "Time",
    value: "",
    props: {
      icon: TimeIcon,
      arr_html: [
        { html: "Time", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "DateTime",
    type: "DateTime",
    value: "",
    props: {
      icon: DateTimeIcon,
      arr_html: [
        { html: "DateTime", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Select",
    type: "Select",
    value: "",
    props: {
      icon: SelectIcon,
      arr_html: [
        { html: "Select", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],

      fields: {
        store: [
          { option: "" },
        ],
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Multi-choice",
    type: "Multichoice",
    value: "",
    props: {
      icon: MultichoiceIcon,
      arr_html: [
        {
          html: "Multichoice",
          klass: "md:text-xl text-lg leading-loose",
        },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        store: [
          { option: "" },
        ],
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Radio",
    type: "Radio",
    value: "",
    props: {
      icon: RadioIcon,
      arr_html: [
        { html: "Radio", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        store:[
          { option: "" },
        ],
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "CheckBox",
    type: "Checkbox",
    value: "",
    props: {
      icon: CheckboxIcon,
      arr_html: [
        { html: "Checkbox", klass: "md:text-xl text-lg leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose" },
      ],
      fields: {
        store: [
          { option: "" },
        ],
        validation: {
          required: required,
        },
      },
    },
  },
];

/* src/lib/ui/ListInputs.svelte generated by Svelte v3.55.0 */

function get_each_context$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (26:37) 
function create_if_block_1$7(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*input*/ ctx[4].props.icon;

	function switch_props(ctx) {
		return {};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component(switch_value, switch_props());
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (switch_value !== (switch_value = /*input*/ ctx[4].props.icon)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component(switch_value, switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (24:8) {#if typeof input?.props?.icon === "string"}
function create_if_block$k(ctx) {
	let i;

	return {
		c() {
			i = element("i");
			attr(i, "class", "fa-light fa-" + /*input*/ ctx[4]?.props?.icon);
		},
		m(target, anchor) {
			insert(target, i, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(i);
		}
	};
}

// (19:4) {#each basicInputs as input}
function create_each_block$6(ctx) {
	let div1;
	let current_block_type_index;
	let if_block;
	let t0;
	let div0;
	let t1_value = /*input*/ ctx[4].label + "";
	let t1;
	let t2;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block$k, create_if_block_1$7];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (typeof /*input*/ ctx[4]?.props?.icon === "string") return 0;
		if (/*input*/ ctx[4]?.props?.icon) return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	function click_handler() {
		return /*click_handler*/ ctx[2](/*input*/ ctx[4]);
	}

	return {
		c() {
			div1 = element("div");
			if (if_block) if_block.c();
			t0 = space();
			div0 = element("div");
			t1 = text(t1_value);
			t2 = space();
			attr(div0, "class", "ml-2");
			attr(div1, "class", "flex flex-row items-center py-2 px-3 sm:px-4 mb-4 mx-2 shadow rounded text-sm sm:text-basic text-gray-700 hover:text-indigo-700 border border-transaparent hover:border-indigo-700 cursor-pointer");
		},
		m(target, anchor) {
			insert(target, div1, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(div1, null);
			}

			append(div1, t0);
			append(div1, div0);
			append(div0, t1);
			append(div1, t2);
			current = true;

			if (!mounted) {
				dispose = listen(div1, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (if_block) if_block.p(ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}

			mounted = false;
			dispose();
		}
	};
}

function create_fragment$p(ctx) {
	let div1;
	let t1;
	let div3;
	let div2;
	let current;
	let each_value = /*basicInputs*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div1 = element("div");
			div1.innerHTML = `<div class="font-semibold text-gray-800 capitalize p-2 mb-4 text-2xl ">choose input</div>`;
			t1 = space();
			div3 = element("div");
			div2 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div1, "class", "flex flex-row justify-center relative");
			attr(div2, "class", "grid grid-cols-3 ");
			attr(div3, "class", "mt-4 overflow-auto h-3/4 ");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			insert(target, t1, anchor);
			insert(target, div3, anchor);
			append(div3, div2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div2, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*select, basicInputs*/ 3) {
				each_value = /*basicInputs*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$6(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$6(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div2, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (detaching) detach(t1);
			if (detaching) detach(div3);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$p($$self) {
	const dispatch = createEventDispatcher();
	let basicInputs = inputs().slice(0, 13);

	function select(input) {
		dispatch("select", input);
	}

	const click_handler = input => select(input);
	return [basicInputs, select, click_handler];
}

class ListInputs extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$p, create_fragment$p, safe_not_equal, {});
	}
}

/** Dispatch event on click outside of node */
function clickOutside(node) {
  
  const handleClick = event => {
    const dname = event?.path?.[0]?.dataset.name || event?.path?.[1]?.dataset.name;

    if(dname === "showMenu") return
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      );
    }
  };

	document.addEventListener('click', handleClick, true);
  
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
	}
}

/* src/lib/ui/Modal.svelte generated by Svelte v3.55.0 */

function create_if_block$j(ctx) {
	let main;
	let div2;
	let div0;
	let t;
	let div1;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	return {
		c() {
			main = element("main");
			div2 = element("div");
			div0 = element("div");
			div0.innerHTML = `<i class="fa-light fa-xmark text-xl"></i>`;
			t = space();
			div1 = element("div");
			if (default_slot) default_slot.c();
			attr(div0, "class", "absolute top-0 right-0 m-5 cursor-pointer");
			attr(div1, "class", "mt-4 pb-5 min-h-fit");
			attr(div2, "class", "relative p-5 rounded-lg shadow bg-white max-w-2xl max-h-fit w-full ");
			attr(main, "class", "fixed md:p-6 p-4 top-0 left-0 w-screen text-gray-800 h-screen bg-black bg-opacity-50 flex items-center justify-center z-50 ");
		},
		m(target, anchor) {
			insert(target, main, anchor);
			append(main, div2);
			append(div2, div0);
			append(div2, t);
			append(div2, div1);

			if (default_slot) {
				default_slot.m(div1, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(div0, "click", stop_propagation(/*close*/ ctx[1])),
					action_destroyer(clickOutside.call(null, div2)),
					listen(div2, "click_outside", /*close*/ ctx[1])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(main);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$o(ctx) {
	let div;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$j(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*show*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*show*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$j(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

function instance$o($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { show = false } = $$props;
	const dispatch = createEventDispatcher();

	function close() {
		$$invalidate(0, show = false);
		dispatch("close");
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	return [show, close, $$scope, slots];
}

class Modal extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$o, create_fragment$o, safe_not_equal, { show: 0 });
	}
}

/* src/lib/ui/EditorSteps.svelte generated by Svelte v3.55.0 */

function create_default_slot$2(ctx) {
	let listinputs;
	let current;
	listinputs = new ListInputs({});
	listinputs.$on("select", /*saveInput*/ ctx[1]);

	return {
		c() {
			create_component(listinputs.$$.fragment);
		},
		m(target, anchor) {
			mount_component(listinputs, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(listinputs.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(listinputs.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(listinputs, detaching);
		}
	};
}

function create_fragment$n(ctx) {
	let modal;
	let updating_show;
	let current;

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[2](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot$2] },
		$$scope: { ctx }
	};

	if (/*show*/ ctx[0] !== void 0) {
		modal_props.show = /*show*/ ctx[0];
	}

	modal = new Modal({ props: modal_props });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding, /*show*/ ctx[0]));

	return {
		c() {
			create_component(modal.$$.fragment);
		},
		m(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const modal_changes = {};

			if (dirty & /*$$scope*/ 16) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_show && dirty & /*show*/ 1) {
				updating_show = true;
				modal_changes.show = /*show*/ ctx[0];
				add_flush_callback(() => updating_show = false);
			}

			modal.$set(modal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(modal, detaching);
		}
	};
}

function instance$n($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { show = true } = $$props;

	function saveInput(evt) {
		$$invalidate(0, show = false);
		dispatch("complete", evt.detail);
	}

	function modal_show_binding(value) {
		show = value;
		$$invalidate(0, show);
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
	};

	return [show, saveInput, modal_show_binding];
}

class EditorSteps extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$n, create_fragment$n, safe_not_equal, { show: 0 });
	}
}

/* src/lib/ui/InputTypes/Radio.svelte generated by Svelte v3.55.0 */

function get_each_context_1$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[17] = list[i];
	return child_ctx;
}

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[17] = list[i];
	child_ctx[18] = list;
	child_ctx[19] = i;
	return child_ctx;
}

// (81:2) {:else}
function create_else_block$a(ctx) {
	let each_1_anchor;
	let each_value_1 = /*store*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*store, name, value*/ 11) {
				each_value_1 = /*store*/ ctx[1];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (42:2) {#if editable}
function create_if_block$i(ctx) {
	let div0;
	let t0;
	let div2;
	let mounted;
	let dispose;
	let each_value = /*store*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
	}

	return {
		c() {
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			div2 = element("div");

			div2.innerHTML = `<i class="w-4 h-4 fa-light fa-plus"></i> 
      <div class="capitalize">Add choice</div>`;

			attr(div0, "class", "flex flex-col space-y-2 max-w-[350px]");
			attr(div2, "class", "flex items-center pt-2 space-x-3 text-gray-400 hover:text-gray-700 cursor-pointer ");
		},
		m(target, anchor) {
			insert(target, div0, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			/*div0_binding*/ ctx[14](div0);
			insert(target, t0, anchor);
			insert(target, div2, anchor);

			if (!mounted) {
				dispose = listen(div2, "click", /*click_handler_1*/ ctx[15]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*remove, store, addOption, rmOption, name, value*/ 235) {
				each_value = /*store*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$5(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$5(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			if (detaching) detach(div0);
			destroy_each(each_blocks, detaching);
			/*div0_binding*/ ctx[14](null);
			if (detaching) detach(t0);
			if (detaching) detach(div2);
			mounted = false;
			dispose();
		}
	};
}

// (82:4) {#each store as opt}
function create_each_block_1$3(ctx) {
	let label;
	let input;
	let input_value_value;
	let t0;
	let div;
	let t1_value = /*opt*/ ctx[17].option + "";
	let t1;
	let t2;
	let mounted;
	let dispose;

	return {
		c() {
			label = element("label");
			input = element("input");
			t0 = space();
			div = element("div");
			t1 = text(t1_value);
			t2 = space();
			attr(input, "class", "focus:border-transparent border-tertiary text-blue-700 form-radio");
			attr(input, "name", /*name*/ ctx[3]);
			attr(input, "type", "radio");
			input.__value = input_value_value = /*opt*/ ctx[17].option;
			input.value = input.__value;
			/*$$binding_groups*/ ctx[9][0].push(input);
			attr(label, "class", "flex items-center space-x-3 cursor-pointer");
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, input);
			input.checked = input.__value === /*value*/ ctx[0];
			append(label, t0);
			append(label, div);
			append(div, t1);
			append(label, t2);

			if (!mounted) {
				dispose = listen(input, "change", /*input_change_handler*/ ctx[16]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*name*/ 8) {
				attr(input, "name", /*name*/ ctx[3]);
			}

			if (dirty & /*store*/ 2 && input_value_value !== (input_value_value = /*opt*/ ctx[17].option)) {
				input.__value = input_value_value;
				input.value = input.__value;
			}

			if (dirty & /*value*/ 1) {
				input.checked = input.__value === /*value*/ ctx[0];
			}

			if (dirty & /*store*/ 2 && t1_value !== (t1_value = /*opt*/ ctx[17].option + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(label);
			/*$$binding_groups*/ ctx[9][0].splice(/*$$binding_groups*/ ctx[9][0].indexOf(input), 1);
			mounted = false;
			dispose();
		}
	};
}

// (44:6) {#each store as opt, i}
function create_each_block$5(ctx) {
	let div;
	let input0;
	let input0_value_value;
	let t0;
	let input1;
	let t1;
	let i_1;
	let t2;
	let mounted;
	let dispose;

	function keyup_handler(...args) {
		return /*keyup_handler*/ ctx[10](/*i*/ ctx[19], ...args);
	}

	function keydown_handler(...args) {
		return /*keydown_handler*/ ctx[11](/*i*/ ctx[19], ...args);
	}

	function input1_input_handler() {
		/*input1_input_handler*/ ctx[12].call(input1, /*each_value*/ ctx[18], /*i*/ ctx[19]);
	}

	function click_handler() {
		return /*click_handler*/ ctx[13](/*i*/ ctx[19]);
	}

	return {
		c() {
			div = element("div");
			input0 = element("input");
			t0 = space();
			input1 = element("input");
			t1 = space();
			i_1 = element("i");
			t2 = space();
			attr(input0, "class", "w-4 h-4 border-tertiary form-radio text-blue-700");
			attr(input0, "name", /*name*/ ctx[3]);
			attr(input0, "type", "radio");
			input0.__value = input0_value_value = /*opt*/ ctx[17];
			input0.value = input0.__value;
			/*$$binding_groups*/ ctx[9][0].push(input0);
			attr(input1, "type", "text");
			attr(input1, "class", "focus:outline-none bg-transparent border-0 rounded flex-auto");
			attr(input1, "placeholder", "Type Option");
			attr(i_1, "class", "fa-light fa-xmark text-xl text-gray-400 cursor-pointer");
			attr(div, "class", "flex items-center space-x-3 w-full");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input0);
			input0.checked = input0.__value === /*value*/ ctx[0];
			append(div, t0);
			append(div, input1);
			set_input_value(input1, /*opt*/ ctx[17].option);
			append(div, t1);
			append(div, i_1);
			append(div, t2);

			if (!mounted) {
				dispose = [
					listen(input0, "change", /*input0_change_handler*/ ctx[8]),
					listen(input1, "keyup", keyup_handler),
					listen(input1, "keydown", keydown_handler),
					listen(input1, "input", input1_input_handler),
					listen(i_1, "click", click_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*name*/ 8) {
				attr(input0, "name", /*name*/ ctx[3]);
			}

			if (dirty & /*store*/ 2 && input0_value_value !== (input0_value_value = /*opt*/ ctx[17])) {
				input0.__value = input0_value_value;
				input0.value = input0.__value;
			}

			if (dirty & /*value*/ 1) {
				input0.checked = input0.__value === /*value*/ ctx[0];
			}

			if (dirty & /*store*/ 2 && input1.value !== /*opt*/ ctx[17].option) {
				set_input_value(input1, /*opt*/ ctx[17].option);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			/*$$binding_groups*/ ctx[9][0].splice(/*$$binding_groups*/ ctx[9][0].indexOf(input0), 1);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$m(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$i;
		return create_else_block$a;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "space-y-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

function instance$m($$self, $$props, $$invalidate) {
	let { value } = $$props;
	let { editable } = $$props;
	let { name = "1" } = $$props;
	let { store } = $$props;

	// export let theme;
	let itemsNode;

	function addOption(e, i = -1) {
		let l = i == -1 ? store.length - 1 : i;

		if (e.key === "Enter") {
			l = l + 1;
			store.splice(l, 0, { option: "" });
			$$invalidate(1, store);

			setTimeout(() => {
				const item = [...itemsNode.children][l];
				item?.children[1]?.focus();
			});
		}
	}

	function rmOption(e, i) {
		if (e.key === "Backspace" && e.currentTarget.value === "") {
			let l = i - 1;
			remove(i);

			setTimeout(() => {
				const item = [...itemsNode.children][l];
				item?.children[1]?.focus();
			});
		}
	}

	function remove(i) {
		store.splice(i, 1);
		$$invalidate(1, store);
	}

	const $$binding_groups = [[]];

	function input0_change_handler() {
		value = this.__value;
		$$invalidate(0, value);
	}

	const keyup_handler = (i, e) => addOption(e, i);
	const keydown_handler = (i, e) => rmOption(e, i);

	function input1_input_handler(each_value, i) {
		each_value[i].option = this.value;
		$$invalidate(1, store);
	}

	const click_handler = i => remove(i);

	function div0_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			itemsNode = $$value;
			$$invalidate(4, itemsNode);
		});
	}

	const click_handler_1 = e => {
		e.key = "Enter";
		addOption(e);
	};

	function input_change_handler() {
		value = this.__value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('name' in $$props) $$invalidate(3, name = $$props.name);
		if ('store' in $$props) $$invalidate(1, store = $$props.store);
	};

	return [
		value,
		store,
		editable,
		name,
		itemsNode,
		addOption,
		rmOption,
		remove,
		input0_change_handler,
		$$binding_groups,
		keyup_handler,
		keydown_handler,
		input1_input_handler,
		click_handler,
		div0_binding,
		click_handler_1,
		input_change_handler
	];
}

class Radio extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$m, create_fragment$m, safe_not_equal, { value: 0, editable: 2, name: 3, store: 1 });
	}
}

/* src/lib/ui/InputTypes/Select.svelte generated by Svelte v3.55.0 */

function get_each_context_1$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	return child_ctx;
}

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	child_ctx[15] = list;
	child_ctx[16] = i;
	return child_ctx;
}

// (75:2) {:else}
function create_else_block$9(ctx) {
	let select;
	let mounted;
	let dispose;
	let each_value_1 = /*store*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
	}

	return {
		c() {
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(select, "class", "w-full p-2.5 border border-tertiary rounded bg-transparent focus:outline-quaternary ");
			if (/*selected*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[13].call(select));
		},
		m(target, anchor) {
			insert(target, select, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			select_option(select, /*selected*/ ctx[1]);

			if (!mounted) {
				dispose = listen(select, "change", /*select_change_handler*/ ctx[13]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*store*/ 1) {
				each_value_1 = /*store*/ ctx[0];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (dirty & /*selected, store*/ 3) {
				select_option(select, /*selected*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(select);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

// (41:2) {#if editable}
function create_if_block$h(ctx) {
	let div1;
	let ul;
	let t0;
	let div0;
	let mounted;
	let dispose;
	let each_value = /*store*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	return {
		c() {
			div1 = element("div");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			div0 = element("div");
			div0.textContent = "Add choice";
			attr(div0, "class", "text-gray-400 hover:text-gray-600 cursor-pointer ");
			attr(div1, "class", "p-3 px-5 border border-tertiary rounded focus:outline-quaternary w-1/2");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			/*ul_binding*/ ctx[11](ul);
			append(div1, t0);
			append(div1, div0);

			if (!mounted) {
				dispose = listen(div0, "click", /*click_handler_1*/ ctx[12]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*remove, store, addOption, rmOption*/ 113) {
				each_value = /*store*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_each(each_blocks, detaching);
			/*ul_binding*/ ctx[11](null);
			mounted = false;
			dispose();
		}
	};
}

// (80:6) {#each store as opt}
function create_each_block_1$2(ctx) {
	let option;
	let t_value = /*opt*/ ctx[14].option + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = option_value_value = /*opt*/ ctx[14].option;
			option.value = option.__value;
			option.selected = "true";
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*store*/ 1 && t_value !== (t_value = /*opt*/ ctx[14].option + "")) set_data(t, t_value);

			if (dirty & /*store*/ 1 && option_value_value !== (option_value_value = /*opt*/ ctx[14].option)) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (46:8) {#each store as opt, i}
function create_each_block$4(ctx) {
	let li;
	let input;
	let t0;
	let i_1;
	let t1;
	let mounted;
	let dispose;

	function keyup_handler(...args) {
		return /*keyup_handler*/ ctx[7](/*i*/ ctx[16], ...args);
	}

	function keydown_handler(...args) {
		return /*keydown_handler*/ ctx[8](/*i*/ ctx[16], ...args);
	}

	function input_input_handler() {
		/*input_input_handler*/ ctx[9].call(input, /*each_value*/ ctx[15], /*i*/ ctx[16]);
	}

	function click_handler() {
		return /*click_handler*/ ctx[10](/*i*/ ctx[16]);
	}

	return {
		c() {
			li = element("li");
			input = element("input");
			t0 = space();
			i_1 = element("i");
			t1 = space();
			attr(input, "placeholder", "Type Option");
			attr(input, "type", "text");
			attr(input, "class", "focus:outline-quaternary border-0 bg-transparent");
			attr(i_1, "class", "fa-light fa-xmark text-xl text-gray-400 cursor-pointer");
			attr(li, "class", "flex justify-between space-x-1 my-2");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, input);
			set_input_value(input, /*opt*/ ctx[14].option);
			append(li, t0);
			append(li, i_1);
			append(li, t1);

			if (!mounted) {
				dispose = [
					listen(input, "keyup", keyup_handler),
					listen(input, "keydown", keydown_handler),
					listen(input, "input", input_input_handler),
					listen(i_1, "click", click_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*store*/ 1 && input.value !== /*opt*/ ctx[14].option) {
				set_input_value(input, /*opt*/ ctx[14].option);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$l(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$h;
		return create_else_block$9;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "space-y-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

function instance$l($$self, $$props, $$invalidate) {
	let { editable = false } = $$props;
	let { store } = $$props;
	let { selected } = $$props;
	let itemsNode;

	// export let theme;
	function remove(i) {
		store.splice(i, 1);
		$$invalidate(0, store);
	}

	function addOption(e, i = -1) {
		let l = i == -1 ? store.length - 1 : i;

		if (e.key === "Enter") {
			l = l + 1;
			store.splice(l, 0, { option: "" });
			$$invalidate(0, store);

			setTimeout(() => {
				const item = [...itemsNode.children][l];
				item?.children[0]?.focus();
			});
		}
	}

	function rmOption(e, i) {
		if (e.key === "Backspace" && e.currentTarget.value === "") {
			let l = i - 1;
			remove(i);

			setTimeout(() => {
				const item = [...itemsNode.children][l];
				item?.children[0]?.focus();
			});
		}
	}

	const keyup_handler = (i, e) => addOption(e, i);
	const keydown_handler = (i, e) => rmOption(e, i);

	function input_input_handler(each_value, i) {
		each_value[i].option = this.value;
		$$invalidate(0, store);
	}

	const click_handler = i => remove(i);

	function ul_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			itemsNode = $$value;
			$$invalidate(3, itemsNode);
		});
	}

	const click_handler_1 = e => {
		e.key = "Enter";
		addOption(e);
	};

	function select_change_handler() {
		selected = select_value(this);
		$$invalidate(1, selected);
		$$invalidate(0, store);
	}

	$$self.$$set = $$props => {
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('store' in $$props) $$invalidate(0, store = $$props.store);
		if ('selected' in $$props) $$invalidate(1, selected = $$props.selected);
	};

	return [
		store,
		selected,
		editable,
		itemsNode,
		remove,
		addOption,
		rmOption,
		keyup_handler,
		keydown_handler,
		input_input_handler,
		click_handler,
		ul_binding,
		click_handler_1,
		select_change_handler
	];
}

class Select extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$l, create_fragment$l, safe_not_equal, { editable: 2, store: 0, selected: 1 });
	}
}

/* src/lib/ui/InputTypes/Multichoice.svelte generated by Svelte v3.55.0 */

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	return child_ctx;
}

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	child_ctx[15] = list;
	child_ctx[16] = i;
	return child_ctx;
}

// (78:2) {:else}
function create_else_block$8(ctx) {
	let select;
	let mounted;
	let dispose;
	let each_value_1 = /*store*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	return {
		c() {
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			select.multiple = true;
			attr(select, "class", "block w-full mt-1 p-2.5 border border-tertiary rounded bg-transparent focus:outline-quaternary ");
			if (/*selected*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[13].call(select));
		},
		m(target, anchor) {
			insert(target, select, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			select_options(select, /*selected*/ ctx[1]);

			if (!mounted) {
				dispose = listen(select, "change", /*select_change_handler*/ ctx[13]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*store*/ 1) {
				each_value_1 = /*store*/ ctx[0];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (dirty & /*selected, store*/ 3) {
				select_options(select, /*selected*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(select);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

// (41:2) {#if editable}
function create_if_block$g(ctx) {
	let div2;
	let div1;
	let ul;
	let t0;
	let div0;
	let mounted;
	let dispose;
	let each_value = /*store*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			div0 = element("div");

			div0.innerHTML = `<i class="w-4 h-4 fa-light fa-plus"></i>
          Add choice`;

			attr(div0, "class", "text-gray-300 hover:text-gray-600 cursor-pointer ");
			attr(div1, "class", "p-3 px-5 border border-tertiary rounded focus:outline-none max-w-[350px]");
			attr(div2, "class", "flex flex-col my-3");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			/*ul_binding*/ ctx[11](ul);
			append(div1, t0);
			append(div1, div0);

			if (!mounted) {
				dispose = listen(div0, "click", /*click_handler_1*/ ctx[12]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*remove, store, addOption, rmOption*/ 113) {
				each_value = /*store*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			if (detaching) detach(div2);
			destroy_each(each_blocks, detaching);
			/*ul_binding*/ ctx[11](null);
			mounted = false;
			dispose();
		}
	};
}

// (84:6) {#each store as opt}
function create_each_block_1$1(ctx) {
	let option;
	let t_value = /*opt*/ ctx[14].option + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = option_value_value = /*opt*/ ctx[14].option;
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*store*/ 1 && t_value !== (t_value = /*opt*/ ctx[14].option + "")) set_data(t, t_value);

			if (dirty & /*store*/ 1 && option_value_value !== (option_value_value = /*opt*/ ctx[14].option)) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (47:10) {#each store as opt, i}
function create_each_block$3(ctx) {
	let li;
	let input;
	let t0;
	let i_1;
	let t1;
	let mounted;
	let dispose;

	function keyup_handler(...args) {
		return /*keyup_handler*/ ctx[7](/*i*/ ctx[16], ...args);
	}

	function keydown_handler(...args) {
		return /*keydown_handler*/ ctx[8](/*i*/ ctx[16], ...args);
	}

	function input_input_handler() {
		/*input_input_handler*/ ctx[9].call(input, /*each_value*/ ctx[15], /*i*/ ctx[16]);
	}

	function click_handler() {
		return /*click_handler*/ ctx[10](/*i*/ ctx[16]);
	}

	return {
		c() {
			li = element("li");
			input = element("input");
			t0 = space();
			i_1 = element("i");
			t1 = space();
			attr(input, "type", "text");
			attr(input, "class", "focus:outline-quaternary border-0 flex-auto bg-transparent");
			attr(input, "placeholder", "Type Option");
			attr(i_1, "class", "fa-light fa-xmark text-xl text-gray-400 cursor-pointer");
			attr(li, "class", "flex space-x-1 my-2");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, input);
			set_input_value(input, /*opt*/ ctx[14].option);
			append(li, t0);
			append(li, i_1);
			append(li, t1);

			if (!mounted) {
				dispose = [
					listen(input, "keyup", keyup_handler),
					listen(input, "keydown", keydown_handler),
					listen(input, "input", input_input_handler),
					listen(i_1, "click", click_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*store*/ 1 && input.value !== /*opt*/ ctx[14].option) {
				set_input_value(input, /*opt*/ ctx[14].option);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$k(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$g;
		return create_else_block$8;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "space-y-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

function instance$k($$self, $$props, $$invalidate) {
	let { editable } = $$props;
	let { store } = $$props;

	// export let theme;
	let itemsNode;

	let { selected = store[0].option } = $$props;

	function addOption(e, i = -1) {
		let l = i == -1 ? store.length - 1 : i;

		if (e.key === "Enter") {
			l = l + 1;
			store.splice(l, 0, { option: "" });
			$$invalidate(0, store);

			setTimeout(() => {
				const item = [...itemsNode.children][l];
				item?.children[0]?.focus();
			});
		}
	}

	function rmOption(e, i) {
		if (e.key === "Backspace" && e.currentTarget.value === "") {
			let l = i - 1;
			remove(i);

			setTimeout(() => {
				const item = [...itemsNode.children][l];
				item?.children[0]?.focus();
			});
		}
	}

	function remove(i) {
		store.splice(i, 1);
		$$invalidate(0, store);
	}

	const keyup_handler = (i, e) => addOption(e, i);
	const keydown_handler = (i, e) => rmOption(e, i);

	function input_input_handler(each_value, i) {
		each_value[i].option = this.value;
		$$invalidate(0, store);
	}

	const click_handler = i => remove(i);

	function ul_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			itemsNode = $$value;
			$$invalidate(3, itemsNode);
		});
	}

	const click_handler_1 = e => {
		e.key = "Enter";
		addOption(e);
	};

	function select_change_handler() {
		selected = select_multiple_value(this);
		$$invalidate(1, selected);
		$$invalidate(0, store);
	}

	$$self.$$set = $$props => {
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('store' in $$props) $$invalidate(0, store = $$props.store);
		if ('selected' in $$props) $$invalidate(1, selected = $$props.selected);
	};

	return [
		store,
		selected,
		editable,
		itemsNode,
		addOption,
		rmOption,
		remove,
		keyup_handler,
		keydown_handler,
		input_input_handler,
		click_handler,
		ul_binding,
		click_handler_1,
		select_change_handler
	];
}

class Multichoice extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$k, create_fragment$k, safe_not_equal, { editable: 2, store: 0, selected: 1 });
	}
}

/* src/lib/ui/InputTypes/Text.svelte generated by Svelte v3.55.0 */

function create_else_block$7(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "type", "text");
			attr(input, "class", "p-2.5 border border-tertiary focus:ring-1 bg-transparent focus:outline-quaternary w-full rounded");
			attr(input, "placeholder", /*placeholder*/ ctx[1]);
			input.required = /*required*/ ctx[2];
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler_1*/ ctx[6]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2) {
				attr(input, "placeholder", /*placeholder*/ ctx[1]);
			}

			if (dirty & /*required*/ 4) {
				input.required = /*required*/ ctx[2];
			}

			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
				set_input_value(input, /*value*/ ctx[0]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

// (11:2) {#if editable}
function create_if_block$f(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "type", "text");
			attr(input, "placeholder", "Type placeholder ..");
			attr(input, "class", "placeholder:text-gray-400 text-gray-400 bg-transparent p-2.5 border border-tertiary rounded focus:outline-quaternary w-full");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*placeholder*/ ctx[1]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2 && input.value !== /*placeholder*/ ctx[1]) {
				set_input_value(input, /*placeholder*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$j(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[3]) return create_if_block$f;
		return create_else_block$7;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "flex flex-col w-full relative");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

function instance$j($$self, $$props, $$invalidate) {
	let { value } = $$props;
	let { required = false } = $$props;
	let { placeholder } = $$props;
	let { editable = false } = $$props;
	let { errorMsg = "" } = $$props;

	function input_input_handler() {
		placeholder = this.value;
		$$invalidate(1, placeholder);
	}

	function input_input_handler_1() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('required' in $$props) $$invalidate(2, required = $$props.required);
		if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
		if ('editable' in $$props) $$invalidate(3, editable = $$props.editable);
		if ('errorMsg' in $$props) $$invalidate(4, errorMsg = $$props.errorMsg);
	};

	return [
		value,
		placeholder,
		required,
		editable,
		errorMsg,
		input_input_handler,
		input_input_handler_1
	];
}

class Text extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$j, create_fragment$j, safe_not_equal, {
			value: 0,
			required: 2,
			placeholder: 1,
			editable: 3,
			errorMsg: 4
		});
	}
}

/* src/lib/ui/InputTypes/Textarea.svelte generated by Svelte v3.55.0 */

function create_else_block$6(ctx) {
	let textarea;
	let mounted;
	let dispose;

	return {
		c() {
			textarea = element("textarea");
			attr(textarea, "rows", "5");
			attr(textarea, "class", "p-2.5 border border-tertiary rounded bg-transparent focus:outline-quaternary w-full");
			attr(textarea, "placeholder", /*placeholder*/ ctx[1]);
			textarea.required = /*required*/ ctx[3];
		},
		m(target, anchor) {
			insert(target, textarea, anchor);
			set_input_value(textarea, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = listen(textarea, "input", /*textarea_input_handler_1*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2) {
				attr(textarea, "placeholder", /*placeholder*/ ctx[1]);
			}

			if (dirty & /*required*/ 8) {
				textarea.required = /*required*/ ctx[3];
			}

			if (dirty & /*value*/ 1) {
				set_input_value(textarea, /*value*/ ctx[0]);
			}
		},
		d(detaching) {
			if (detaching) detach(textarea);
			mounted = false;
			dispose();
		}
	};
}

// (11:2) {#if editable}
function create_if_block$e(ctx) {
	let textarea;
	let mounted;
	let dispose;

	return {
		c() {
			textarea = element("textarea");
			attr(textarea, "rows", "5");
			attr(textarea, "placeholder", "Type placeholder ..");
			attr(textarea, "class", "text-gray-400 p-2.5 border border-tertiary bg-transparent rounded focus:outline-quaternary w-full");
		},
		m(target, anchor) {
			insert(target, textarea, anchor);
			set_input_value(textarea, /*placeholder*/ ctx[1]);

			if (!mounted) {
				dispose = listen(textarea, "input", /*textarea_input_handler*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2) {
				set_input_value(textarea, /*placeholder*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(textarea);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$i(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$e;
		return create_else_block$6;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "flex flex-col w-full");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

function instance$i($$self, $$props, $$invalidate) {
	let { editable } = $$props;
	let { value = "" } = $$props;
	let { required } = $$props;
	let { placeholder } = $$props;

	function textarea_input_handler() {
		placeholder = this.value;
		$$invalidate(1, placeholder);
	}

	function textarea_input_handler_1() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('required' in $$props) $$invalidate(3, required = $$props.required);
		if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
	};

	return [
		value,
		placeholder,
		editable,
		required,
		textarea_input_handler,
		textarea_input_handler_1
	];
}

class Textarea extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$i, create_fragment$i, safe_not_equal, {
			editable: 2,
			value: 0,
			required: 3,
			placeholder: 1
		});
	}
}

/* src/lib/ui/InputTypes/Submit.svelte generated by Svelte v3.55.0 */

function create_if_block_2$5(ctx) {
	let div;
	let t;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			t = text(/*label*/ ctx[0]);
			attr(div, "role", "button");
			attr(div, "class", "mr-4 bg-primary/90 hover:bg-primary border-tertiary/30 border text-secondary max-w-fit rounded text-center px-10 py-2.5 capitalize focus:outline-quaternary font-semibold cursor-pointer select-none ");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);

			if (!mounted) {
				dispose = listen(div, "click", /*click_handler*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*label*/ 1) set_data(t, /*label*/ ctx[0]);
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (18:2) {#if editable}
function create_if_block$d(ctx) {
	let div1;
	let div0;
	let div0_class_value;
	let t;
	let mounted;
	let dispose;
	let if_block = /*previous*/ ctx[3] && create_if_block_1$6(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			t = space();
			if (if_block) if_block.c();
			attr(div0, "contenteditable", "");
			attr(div0, "class", div0_class_value = "" + (/*noPrevious*/ ctx[1] ? 'opacity-50' : '') + " rounded bg-primary/90 text-secondary border-tertiary/30 border hover:bg-primary max-w-fit text-center px-10 py-2.5 capitalize focus:outline-quaternary font-semibold");
			if (/*label*/ ctx[0] === void 0) add_render_callback(() => /*div0_input_handler*/ ctx[8].call(div0));
			attr(div1, "class", "relative mr-4");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);

			if (/*label*/ ctx[0] !== void 0) {
				div0.innerHTML = /*label*/ ctx[0];
			}

			append(div1, t);
			if (if_block) if_block.m(div1, null);

			if (!mounted) {
				dispose = listen(div0, "input", /*div0_input_handler*/ ctx[8]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*noPrevious*/ 2 && div0_class_value !== (div0_class_value = "" + (/*noPrevious*/ ctx[1] ? 'opacity-50' : '') + " rounded bg-primary/90 text-secondary border-tertiary/30 border hover:bg-primary max-w-fit text-center px-10 py-2.5 capitalize focus:outline-quaternary font-semibold")) {
				attr(div0, "class", div0_class_value);
			}

			if (dirty & /*label*/ 1 && /*label*/ ctx[0] !== div0.innerHTML) {
				div0.innerHTML = /*label*/ ctx[0];
			}

			if (/*previous*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1$6(ctx);
					if_block.c();
					if_block.m(div1, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

// (28:6) {#if previous}
function create_if_block_1$6(ctx) {
	let i;
	let i_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			i = element("i");
			attr(i, "class", i_class_value = "fa-light rounded cursor-pointer text-xs " + (/*noPrevious*/ ctx[1] ? 'fa-eye-slash' : 'fa-eye') + " p-1 bg-black text-white bg-opacity-75 border z-50 top-0 right-0 absolute");
		},
		m(target, anchor) {
			insert(target, i, anchor);

			if (!mounted) {
				dispose = listen(i, "click", /*togglePrev*/ ctx[6]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*noPrevious*/ 2 && i_class_value !== (i_class_value = "fa-light rounded cursor-pointer text-xs " + (/*noPrevious*/ ctx[1] ? 'fa-eye-slash' : 'fa-eye') + " p-1 bg-black text-white bg-opacity-75 border z-50 top-0 right-0 absolute")) {
				attr(i, "class", i_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(i);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$h(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$d;
		if (!/*previous*/ ctx[3] || !/*noPrevious*/ ctx[1]) return create_if_block_2$5;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type && current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			set_style(div, "--ft-primary", /*buttonBgColor*/ ctx[4]);
			set_style(div, "--ft-secondary", /*buttonTextColor*/ ctx[5]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if (if_block) if_block.d(1);
				if_block = current_block_type && current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}

			if (dirty & /*buttonBgColor*/ 16) {
				set_style(div, "--ft-primary", /*buttonBgColor*/ ctx[4]);
			}

			if (dirty & /*buttonTextColor*/ 32) {
				set_style(div, "--ft-secondary", /*buttonTextColor*/ ctx[5]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);

			if (if_block) {
				if_block.d();
			}
		}
	};
}

function instance$h($$self, $$props, $$invalidate) {
	let { label = "submit" } = $$props;
	let { editable } = $$props;
	let { previous = false } = $$props;
	let { buttonBgColor } = $$props;
	let { buttonTextColor } = $$props;
	let { noPrevious = false } = $$props;

	// export let theme;
	function togglePrev() {
		$$invalidate(1, noPrevious = !noPrevious);
	}

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function div0_input_handler() {
		label = this.innerHTML;
		$$invalidate(0, label);
	}

	$$self.$$set = $$props => {
		if ('label' in $$props) $$invalidate(0, label = $$props.label);
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('previous' in $$props) $$invalidate(3, previous = $$props.previous);
		if ('buttonBgColor' in $$props) $$invalidate(4, buttonBgColor = $$props.buttonBgColor);
		if ('buttonTextColor' in $$props) $$invalidate(5, buttonTextColor = $$props.buttonTextColor);
		if ('noPrevious' in $$props) $$invalidate(1, noPrevious = $$props.noPrevious);
	};

	return [
		label,
		noPrevious,
		editable,
		previous,
		buttonBgColor,
		buttonTextColor,
		togglePrev,
		click_handler,
		div0_input_handler
	];
}

class Submit extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
			label: 0,
			editable: 2,
			previous: 3,
			buttonBgColor: 4,
			buttonTextColor: 5,
			noPrevious: 1
		});
	}
}

/* src/lib/ui/InputTypes/CheckBox.svelte generated by Svelte v3.55.0 */

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	return child_ctx;
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	child_ctx[17] = list;
	child_ctx[18] = i;
	return child_ctx;
}

// (77:0) {:else}
function create_else_block$5(ctx) {
	let each_1_anchor;
	let each_value_1 = /*store*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*store, value*/ 3) {
				each_value_1 = /*store*/ ctx[0];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (40:0) {#if editable}
function create_if_block$c(ctx) {
	let div0;
	let t0;
	let div2;
	let mounted;
	let dispose;
	let each_value = /*store*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	return {
		c() {
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			div2 = element("div");

			div2.innerHTML = `<i class="w-4 h-4 fa-light fa-plus"></i> 
    <div class="capitalize">Add choice</div>`;

			attr(div0, "class", "flex flex-col space-y-2 max-w-[350px]");
			attr(div2, "class", "flex items-center space-x-3 my-2 text-gray-400 hover:text-gray-700 cursor-pointer");
		},
		m(target, anchor) {
			insert(target, div0, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			/*div0_binding*/ ctx[13](div0);
			insert(target, t0, anchor);
			insert(target, div2, anchor);

			if (!mounted) {
				dispose = listen(div2, "click", /*click_handler_1*/ ctx[14]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*remove, store, addOption, rmOption, value*/ 115) {
				each_value = /*store*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			if (detaching) detach(div0);
			destroy_each(each_blocks, detaching);
			/*div0_binding*/ ctx[13](null);
			if (detaching) detach(t0);
			if (detaching) detach(div2);
			mounted = false;
			dispose();
		}
	};
}

// (78:2) {#each store as opt}
function create_each_block_1(ctx) {
	let label;
	let input;
	let input_value_value;
	let t0;
	let div;
	let raw_value = /*opt*/ ctx[16].option + "";
	let t1;
	let mounted;
	let dispose;

	return {
		c() {
			label = element("label");
			input = element("input");
			t0 = space();
			div = element("div");
			t1 = space();
			attr(input, "class", "border-tertiary form-checkbox text-blue-700");
			attr(input, "type", "checkbox");
			attr(input, "name", /*value*/ ctx[1]);
			input.__value = input_value_value = /*opt*/ ctx[16].option;
			input.value = input.__value;
			/*$$binding_groups*/ ctx[8][0].push(input);
			attr(label, "class", "flex items-center space-x-3 max-w-fit my-2 cursor-pointer");
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, input);
			input.checked = ~/*value*/ ctx[1].indexOf(input.__value);
			append(label, t0);
			append(label, div);
			div.innerHTML = raw_value;
			append(label, t1);

			if (!mounted) {
				dispose = listen(input, "change", /*input_change_handler*/ ctx[15]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*value*/ 2) {
				attr(input, "name", /*value*/ ctx[1]);
			}

			if (dirty & /*store*/ 1 && input_value_value !== (input_value_value = /*opt*/ ctx[16].option)) {
				input.__value = input_value_value;
				input.value = input.__value;
			}

			if (dirty & /*value*/ 2) {
				input.checked = ~/*value*/ ctx[1].indexOf(input.__value);
			}

			if (dirty & /*store*/ 1 && raw_value !== (raw_value = /*opt*/ ctx[16].option + "")) div.innerHTML = raw_value;		},
		d(detaching) {
			if (detaching) detach(label);
			/*$$binding_groups*/ ctx[8][0].splice(/*$$binding_groups*/ ctx[8][0].indexOf(input), 1);
			mounted = false;
			dispose();
		}
	};
}

// (42:4) {#each store as opt, i}
function create_each_block$2(ctx) {
	let div;
	let input0;
	let input0_value_value;
	let t0;
	let input1;
	let t1;
	let i_1;
	let t2;
	let mounted;
	let dispose;

	function keyup_handler(...args) {
		return /*keyup_handler*/ ctx[9](/*i*/ ctx[18], ...args);
	}

	function keydown_handler(...args) {
		return /*keydown_handler*/ ctx[10](/*i*/ ctx[18], ...args);
	}

	function input1_input_handler() {
		/*input1_input_handler*/ ctx[11].call(input1, /*each_value*/ ctx[17], /*i*/ ctx[18]);
	}

	function click_handler() {
		return /*click_handler*/ ctx[12](/*i*/ ctx[18]);
	}

	return {
		c() {
			div = element("div");
			input0 = element("input");
			t0 = space();
			input1 = element("input");
			t1 = space();
			i_1 = element("i");
			t2 = space();
			attr(input0, "class", "w-4 h-4 border-tertiary form-checkbox text-blue-700");
			attr(input0, "type", "checkbox");
			input0.__value = input0_value_value = /*opt*/ ctx[16];
			input0.value = input0.__value;
			/*$$binding_groups*/ ctx[8][0].push(input0);
			attr(input1, "type", "text");
			attr(input1, "class", "focus:outline-none bg-transparent border-0 rounded flex-auto");
			attr(input1, "placeholder", "Type Option");
			attr(i_1, "class", "fa-light fa-xmark text-xl text-gray-400 cursor-pointer");
			attr(div, "class", "flex items-center space-x-3 w-full");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input0);
			input0.checked = ~/*value*/ ctx[1].indexOf(input0.__value);
			append(div, t0);
			append(div, input1);
			set_input_value(input1, /*opt*/ ctx[16].option);
			append(div, t1);
			append(div, i_1);
			append(div, t2);

			if (!mounted) {
				dispose = [
					listen(input0, "change", /*input0_change_handler*/ ctx[7]),
					listen(input1, "keyup", keyup_handler),
					listen(input1, "keydown", keydown_handler),
					listen(input1, "input", input1_input_handler),
					listen(i_1, "click", click_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*store*/ 1 && input0_value_value !== (input0_value_value = /*opt*/ ctx[16])) {
				input0.__value = input0_value_value;
				input0.value = input0.__value;
			}

			if (dirty & /*value*/ 2) {
				input0.checked = ~/*value*/ ctx[1].indexOf(input0.__value);
			}

			if (dirty & /*store*/ 1 && input1.value !== /*opt*/ ctx[16].option) {
				set_input_value(input1, /*opt*/ ctx[16].option);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			/*$$binding_groups*/ ctx[8][0].splice(/*$$binding_groups*/ ctx[8][0].indexOf(input0), 1);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$g(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$c;
		return create_else_block$5;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$g($$self, $$props, $$invalidate) {
	let { store } = $$props;
	let { editable } = $$props;
	let { value = [] } = $$props;

	// export let theme;
	let itemsNode;

	function addOption(e, i = -1) {
		let l = i == -1 ? store.length - 1 : i;

		if (e.key === "Enter") {
			l = l + 1;
			store.splice(l, 0, { option: "" });
			$$invalidate(0, store);

			setTimeout(() => {
				const item = [...itemsNode.children][l];
				item?.children[1]?.focus();
			});
		}
	}

	function rmOption(e, i) {
		if (e.key === "Backspace" && e.currentTarget.value === "") {
			let l = i - 1;
			remove(i);

			setTimeout(() => {
				const item = [...itemsNode.children][l];
				item?.children[1]?.focus();
			});
		}
	}

	function remove(i) {
		store.splice(i, 1);
		$$invalidate(0, store);
	}

	const $$binding_groups = [[]];

	function input0_change_handler() {
		value = get_binding_group_value($$binding_groups[0], this.__value, this.checked);
		$$invalidate(1, value);
	}

	const keyup_handler = (i, e) => addOption(e, i);
	const keydown_handler = (i, e) => rmOption(e, i);

	function input1_input_handler(each_value, i) {
		each_value[i].option = this.value;
		$$invalidate(0, store);
	}

	const click_handler = i => remove(i);

	function div0_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			itemsNode = $$value;
			$$invalidate(3, itemsNode);
		});
	}

	const click_handler_1 = e => {
		e.key = "Enter";
		addOption(e);
	};

	function input_change_handler() {
		value = get_binding_group_value($$binding_groups[0], this.__value, this.checked);
		$$invalidate(1, value);
	}

	$$self.$$set = $$props => {
		if ('store' in $$props) $$invalidate(0, store = $$props.store);
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
	};

	return [
		store,
		value,
		editable,
		itemsNode,
		addOption,
		rmOption,
		remove,
		input0_change_handler,
		$$binding_groups,
		keyup_handler,
		keydown_handler,
		input1_input_handler,
		click_handler,
		div0_binding,
		click_handler_1,
		input_change_handler
	];
}

class CheckBox extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$g, create_fragment$g, safe_not_equal, { store: 0, editable: 2, value: 1 });
	}
}

/* src/lib/ui/InputTypes/Password.svelte generated by Svelte v3.55.0 */

function create_else_block$4(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "type", "password");
			attr(input, "class", "p-2.5 border border-tertiary bg-transparent rounded focus:outline-quaternary w-full");
			attr(input, "placeholder", /*placeholder*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler_1*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2) {
				attr(input, "placeholder", /*placeholder*/ ctx[1]);
			}

			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
				set_input_value(input, /*value*/ ctx[0]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

// (10:2) {#if editable}
function create_if_block$b(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "type", "text");
			attr(input, "placeholder", "Type placeholder ..");
			attr(input, "class", "text-gray-400 p-2.5 border bg-transparent border-tertiary rounded focus:outline-quaternary w-full");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*placeholder*/ ctx[1]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2 && input.value !== /*placeholder*/ ctx[1]) {
				set_input_value(input, /*placeholder*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$f(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$b;
		return create_else_block$4;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

function instance$f($$self, $$props, $$invalidate) {
	let { editable } = $$props;
	let { value } = $$props;
	let { placeholder } = $$props;
	let { required } = $$props;

	function input_input_handler() {
		placeholder = this.value;
		$$invalidate(1, placeholder);
	}

	function input_input_handler_1() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
		if ('required' in $$props) $$invalidate(3, required = $$props.required);
	};

	return [
		value,
		placeholder,
		editable,
		required,
		input_input_handler,
		input_input_handler_1
	];
}

class Password extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
			editable: 2,
			value: 0,
			placeholder: 1,
			required: 3
		});
	}
}

/* src/lib/ui/InputTypes/Date.svelte generated by Svelte v3.55.0 */

function create_fragment$e(ctx) {
	let div;
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			attr(input, "class", "p-2.5 border bg-transparent border-tertiary rounded focus:outline-quaternary w-full");
			attr(input, "type", "date");
			attr(div, "class", "");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			set_input_value(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[2]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*value*/ 1) {
				set_input_value(input, /*value*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function instance$e($$self, $$props, $$invalidate) {
	let { value } = $$props;
	let { required } = $$props;

	function input_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('required' in $$props) $$invalidate(1, required = $$props.required);
	};

	return [value, required, input_input_handler];
}

let Date$1 = class Date extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$e, create_fragment$e, safe_not_equal, { value: 0, required: 1 });
	}
};

/* src/lib/ui/InputTypes/DateTime.svelte generated by Svelte v3.55.0 */

function create_fragment$d(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "type", "datetime-local");
			attr(input, "class", "p-2.5 border border-tertiary bg-transparent rounded focus:outline-quaternary w-full");
			attr(input, "name", "datetime");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[2]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*value*/ 1) {
				set_input_value(input, /*value*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

function instance$d($$self, $$props, $$invalidate) {
	let { value } = $$props;
	let { required } = $$props;

	function input_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('required' in $$props) $$invalidate(1, required = $$props.required);
	};

	return [value, required, input_input_handler];
}

class DateTime extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$d, create_fragment$d, safe_not_equal, { value: 0, required: 1 });
	}
}

/* src/lib/ui/InputTypes/Email.svelte generated by Svelte v3.55.0 */

function create_else_block$3(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "class", "p-2.5 border border-tertiary bg-transparent rounded focus:outline-quaternary w-full");
			attr(input, "placeholder", /*placeholder*/ ctx[1]);
			attr(input, "type", "email");
			input.required = /*required*/ ctx[3];
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler_1*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2) {
				attr(input, "placeholder", /*placeholder*/ ctx[1]);
			}

			if (dirty & /*required*/ 8) {
				input.required = /*required*/ ctx[3];
			}

			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
				set_input_value(input, /*value*/ ctx[0]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

// (10:2) {#if editable}
function create_if_block$a(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "class", "bg-transparent text-gray-400 p-2.5 border border-tertiary rounded focus:outline-quaternary w-full");
			attr(input, "placeholder", "Type placeholder ..");
			attr(input, "type", "email");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*placeholder*/ ctx[1]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2 && input.value !== /*placeholder*/ ctx[1]) {
				set_input_value(input, /*placeholder*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$c(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$a;
		return create_else_block$3;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

function instance$c($$self, $$props, $$invalidate) {
	let { editable } = $$props;
	let { value } = $$props;
	let { placeholder } = $$props;
	let { required } = $$props;

	function input_input_handler() {
		placeholder = this.value;
		$$invalidate(1, placeholder);
	}

	function input_input_handler_1() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
		if ('required' in $$props) $$invalidate(3, required = $$props.required);
	};

	return [
		value,
		placeholder,
		editable,
		required,
		input_input_handler,
		input_input_handler_1
	];
}

class Email extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$c, create_fragment$c, safe_not_equal, {
			editable: 2,
			value: 0,
			placeholder: 1,
			required: 3
		});
	}
}

/* src/lib/ui/InputTypes/Number.svelte generated by Svelte v3.55.0 */

function create_else_block$2(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "class", "p-2.5 border border-tertiary bg-transparent rounded focus:outline-quaternary w-full");
			attr(input, "placeholder", /*placeholder*/ ctx[1]);
			attr(input, "type", "number");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler_1*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2) {
				attr(input, "placeholder", /*placeholder*/ ctx[1]);
			}

			if (dirty & /*value*/ 1 && to_number(input.value) !== /*value*/ ctx[0]) {
				set_input_value(input, /*value*/ ctx[0]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

// (11:2) {#if editable}
function create_if_block$9(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "class", "text-gray-400 p-2.5 border bg-transparent border-tertiary rounded focus:outline-quaternary w-full");
			attr(input, "placeholder", "Type placeholder ..");
			attr(input, "type", "text");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*placeholder*/ ctx[1]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 2 && input.value !== /*placeholder*/ ctx[1]) {
				set_input_value(input, /*placeholder*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$b(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[2]) return create_if_block$9;
		return create_else_block$2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "w-full");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

function instance$b($$self, $$props, $$invalidate) {
	let { editable } = $$props;
	let { value } = $$props;
	let { placeholder } = $$props;
	let { required } = $$props;

	function input_input_handler() {
		placeholder = this.value;
		$$invalidate(1, placeholder);
	}

	function input_input_handler_1() {
		value = to_number(this.value);
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('editable' in $$props) $$invalidate(2, editable = $$props.editable);
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
		if ('required' in $$props) $$invalidate(3, required = $$props.required);
	};

	return [
		value,
		placeholder,
		editable,
		required,
		input_input_handler,
		input_input_handler_1
	];
}

class Number extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
			editable: 2,
			value: 0,
			placeholder: 1,
			required: 3
		});
	}
}

/* src/lib/ui/InputTypes/Time.svelte generated by Svelte v3.55.0 */

function create_fragment$a(ctx) {
	let div;
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			attr(input, "class", "p-2.5 border border-tertiary bg-transparent rounded focus:outline-quaternary w-full");
			attr(input, "type", "time");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			set_input_value(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[2]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*value*/ 1) {
				set_input_value(input, /*value*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function instance$a($$self, $$props, $$invalidate) {
	let { value } = $$props;
	let { required } = $$props;

	function input_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('required' in $$props) $$invalidate(1, required = $$props.required);
	};

	return [value, required, input_input_handler];
}

class Time extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { value: 0, required: 1 });
	}
}

var cmpsRegistry = {
  Radio,
  Select,
  Multichoice,
  Text,
  Textarea,
  Submit,
  Checkbox: CheckBox,
  Password,
  Date: Date$1,
  DateTime,
  Email,
  Number,
  Time,
};

function randomString() {
  return (Math.random() + 1).toString(36).substring(2);
}

/* src/lib/ui/Common/Inputs/Menu.svelte generated by Svelte v3.55.0 */

function create_fragment$9(ctx) {
	let div2;
	let div1;
	let span;
	let t0;
	let t1;
	let label_1;
	let input;
	let t2;
	let div0;
	let mounted;
	let dispose;

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			span = element("span");
			t0 = text(/*label*/ ctx[1]);
			t1 = space();
			label_1 = element("label");
			input = element("input");
			t2 = space();
			div0 = element("div");
			attr(span, "class", "text-sm ");
			attr(input, "type", "checkbox");
			input.value = "";
			attr(input, "id", "toggle");
			attr(input, "class", "sr-only peer");
			input.checked = /*required*/ ctx[0];
			attr(div0, "class", "w-8 h-4 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-focus:ring-1 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600");
			attr(label_1, "for", "toggle");
			attr(label_1, "class", "inline-flex relative items-center cursor-pointer");
			attr(div1, "class", "flex justify-between z-50 bg-white hover:bg-gray-50 dark:text-gray-300 cursor-pointer outline-gray-50 items-center w-32 text-sm p-3 capitalize shadow text-gray-500");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, span);
			append(span, t0);
			append(div1, t1);
			append(div1, label_1);
			append(label_1, input);
			append(label_1, t2);
			append(label_1, div0);

			if (!mounted) {
				dispose = [
					listen(input, "click", /*click_handler*/ ctx[4]),
					listen(div1, "click", /*click_handler_1*/ ctx[5]),
					action_destroyer(clickOutside.call(null, div2)),
					listen(div2, "click_outside", /*hideMenu*/ ctx[2])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*label*/ 2) set_data(t0, /*label*/ ctx[1]);

			if (dirty & /*required*/ 1) {
				input.checked = /*required*/ ctx[0];
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div2);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	let { menu } = $$props;
	let { required } = $$props;
	let { label = "Required" } = $$props;

	function hideMenu(e) {
		$$invalidate(3, menu = false);
	}

	const click_handler = () => {
		$$invalidate(0, required = !required);
	};

	const click_handler_1 = () => {
		$$invalidate(0, required = !required);
	};

	$$self.$$set = $$props => {
		if ('menu' in $$props) $$invalidate(3, menu = $$props.menu);
		if ('required' in $$props) $$invalidate(0, required = $$props.required);
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
	};

	return [required, label, hideMenu, menu, click_handler, click_handler_1];
}

class Menu extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$9, create_fragment$9, safe_not_equal, { menu: 3, required: 0, label: 1 });
	}
}

/* src/lib/ui/Common/Inputs/SideMenu.svelte generated by Svelte v3.55.0 */

function create_if_block_3$4(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Delete input";
			attr(div, "class", "w-20 text-xs p-1 text-center capitalize bg-gray-600 text-white rounded absolute top-10 -left-3");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (59:4) {#if showAdd}
function create_if_block_2$4(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Add input";
			attr(div, "class", "w-20 text-xs bg-gray-600 p-1 text-center capitalize text-white rounded absolute top-10 -left-3");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (86:4) {#if showMenu}
function create_if_block_1$5(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Show menu";
			attr(div, "class", "w-20 text-xs bg-gray-600 text-white rounded absolute top-10 p-1 text-center capitalize -left-3");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (94:6) {#if menu}
function create_if_block$8(ctx) {
	let menu_1;
	let updating_menu;
	let updating_required;
	let current;

	function menu_1_menu_binding(value) {
		/*menu_1_menu_binding*/ ctx[19](value);
	}

	function menu_1_required_binding(value) {
		/*menu_1_required_binding*/ ctx[20](value);
	}

	let menu_1_props = {};

	if (/*menu*/ ctx[3] !== void 0) {
		menu_1_props.menu = /*menu*/ ctx[3];
	}

	if (/*required*/ ctx[4] !== void 0) {
		menu_1_props.required = /*required*/ ctx[4];
	}

	menu_1 = new Menu({ props: menu_1_props });
	binding_callbacks.push(() => bind(menu_1, 'menu', menu_1_menu_binding, /*menu*/ ctx[3]));
	binding_callbacks.push(() => bind(menu_1, 'required', menu_1_required_binding, /*required*/ ctx[4]));

	return {
		c() {
			create_component(menu_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(menu_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const menu_1_changes = {};

			if (!updating_menu && dirty & /*menu*/ 8) {
				updating_menu = true;
				menu_1_changes.menu = /*menu*/ ctx[3];
				add_flush_callback(() => updating_menu = false);
			}

			if (!updating_required && dirty & /*required*/ 16) {
				updating_required = true;
				menu_1_changes.required = /*required*/ ctx[4];
				add_flush_callback(() => updating_required = false);
			}

			menu_1.$set(menu_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(menu_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(menu_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(menu_1, detaching);
		}
	};
}

function create_fragment$8(ctx) {
	let div7;
	let div1;
	let div0;
	let t0;
	let t1;
	let div3;
	let div2;
	let t2;
	let t3;
	let div6;
	let div4;
	let t4;
	let t5;
	let div5;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*showDelete*/ ctx[0] && create_if_block_3$4();
	let if_block1 = /*showAdd*/ ctx[1] && create_if_block_2$4();
	let if_block2 = /*showMenu*/ ctx[2] && create_if_block_1$5();
	let if_block3 = /*menu*/ ctx[3] && create_if_block$8(ctx);

	return {
		c() {
			div7 = element("div");
			div1 = element("div");
			div0 = element("div");
			div0.innerHTML = `<i class="fa-light fa-trash-can text-lg"></i>`;
			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			div3 = element("div");
			div2 = element("div");
			div2.innerHTML = `<i class="fa-light fa-plus text-lg"></i>`;
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			div6 = element("div");
			div4 = element("div");
			div4.innerHTML = `<i class="fa-light fa-ellipsis-vertical px-1 text-lg"></i>`;
			t4 = space();
			if (if_block2) if_block2.c();
			t5 = space();
			div5 = element("div");
			if (if_block3) if_block3.c();
			attr(div0, "class", "cursor-pointer text-gray-400 hover:text-gray-600 p-1");
			attr(div1, "class", "flex flex-col relative ");
			attr(div2, "class", "cursor-pointer text-gray-400 hover:text-gray-600 p-1");
			attr(div3, "class", "flex flex-col relative ");
			attr(div4, "data-name", "showMenu");
			attr(div4, "class", "cursor-pointer text-gray-400 hover:text-gray-600 p-1");
			attr(div5, "class", "absolute -bottom-11 z-50");
			attr(div6, "class", "flex flex-col relative");
			attr(div7, "class", "flex");
		},
		m(target, anchor) {
			insert(target, div7, anchor);
			append(div7, div1);
			append(div1, div0);
			append(div1, t0);
			if (if_block0) if_block0.m(div1, null);
			append(div7, t1);
			append(div7, div3);
			append(div3, div2);
			append(div3, t2);
			if (if_block1) if_block1.m(div3, null);
			append(div7, t3);
			append(div7, div6);
			append(div6, div4);
			append(div6, t4);
			if (if_block2) if_block2.m(div6, null);
			append(div6, t5);
			append(div6, div5);
			if (if_block3) if_block3.m(div5, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div0, "click", prevent_default(/*click_handler*/ ctx[11])),
					listen(div0, "mouseenter", /*mouseenter_handler*/ ctx[12]),
					listen(div0, "mouseleave", /*mouseleave_handler*/ ctx[13]),
					listen(div2, "click", prevent_default(/*add*/ ctx[5])),
					listen(div2, "mouseenter", /*mouseenter_handler_1*/ ctx[14]),
					listen(div2, "mouseleave", /*mouseleave_handler_1*/ ctx[15]),
					listen(div4, "click", prevent_default(/*click_handler_1*/ ctx[16])),
					listen(div4, "mouseenter", /*mouseenter_handler_2*/ ctx[17]),
					listen(div4, "mouseleave", /*mouseleave_handler_2*/ ctx[18])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*showDelete*/ ctx[0]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_3$4();
					if_block0.c();
					if_block0.m(div1, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*showAdd*/ ctx[1]) {
				if (if_block1) ; else {
					if_block1 = create_if_block_2$4();
					if_block1.c();
					if_block1.m(div3, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*showMenu*/ ctx[2]) {
				if (if_block2) ; else {
					if_block2 = create_if_block_1$5();
					if_block2.c();
					if_block2.m(div6, t5);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*menu*/ ctx[3]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty & /*menu*/ 8) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block$8(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(div5, null);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block3);
			current = true;
		},
		o(local) {
			transition_out(if_block3);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div7);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	let { show_inputs } = $$props;
	let { index } = $$props;
	let { showDelete = false } = $$props;
	let { showAdd = false } = $$props;
	let { showMenu = false } = $$props;
	let { key } = $$props;
	let { menu } = $$props;
	let { required } = $$props;
	const dispatch = createEventDispatcher();

	function add() {
		$$invalidate(7, show_inputs = true);
		dispatch("add", index);
	}

	let { inputsStore } = $$props;

	function removeInput() {
		if (!confirm("Are you sure you want to delete this input ?")) return;
		const inputIndex = inputsStore.findIndex(input => input.key === key);

		if (~inputIndex) {
			inputsStore.splice(inputIndex, 1);
			$$invalidate(8, inputsStore);
		}
	}

	inputsStore = inputsStore;
	const click_handler = () => removeInput();
	const mouseenter_handler = () => $$invalidate(0, showDelete = true);
	const mouseleave_handler = () => $$invalidate(0, showDelete = false);
	const mouseenter_handler_1 = () => $$invalidate(1, showAdd = true);
	const mouseleave_handler_1 = () => $$invalidate(1, showAdd = false);

	const click_handler_1 = () => {
		$$invalidate(3, menu = !menu);
		$$invalidate(2, showMenu = false);
	};

	const mouseenter_handler_2 = () => {
		if (!menu) {
			$$invalidate(2, showMenu = true);
		}
	};

	const mouseleave_handler_2 = () => $$invalidate(2, showMenu = false);

	function menu_1_menu_binding(value) {
		menu = value;
		$$invalidate(3, menu);
	}

	function menu_1_required_binding(value) {
		required = value;
		$$invalidate(4, required);
	}

	$$self.$$set = $$props => {
		if ('show_inputs' in $$props) $$invalidate(7, show_inputs = $$props.show_inputs);
		if ('index' in $$props) $$invalidate(9, index = $$props.index);
		if ('showDelete' in $$props) $$invalidate(0, showDelete = $$props.showDelete);
		if ('showAdd' in $$props) $$invalidate(1, showAdd = $$props.showAdd);
		if ('showMenu' in $$props) $$invalidate(2, showMenu = $$props.showMenu);
		if ('key' in $$props) $$invalidate(10, key = $$props.key);
		if ('menu' in $$props) $$invalidate(3, menu = $$props.menu);
		if ('required' in $$props) $$invalidate(4, required = $$props.required);
		if ('inputsStore' in $$props) $$invalidate(8, inputsStore = $$props.inputsStore);
	};

	return [
		showDelete,
		showAdd,
		showMenu,
		menu,
		required,
		add,
		removeInput,
		show_inputs,
		inputsStore,
		index,
		key,
		click_handler,
		mouseenter_handler,
		mouseleave_handler,
		mouseenter_handler_1,
		mouseleave_handler_1,
		click_handler_1,
		mouseenter_handler_2,
		mouseleave_handler_2,
		menu_1_menu_binding,
		menu_1_required_binding
	];
}

class SideMenu extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
			show_inputs: 7,
			index: 9,
			showDelete: 0,
			showAdd: 1,
			showMenu: 2,
			key: 10,
			menu: 3,
			required: 4,
			inputsStore: 8
		});
	}
}

/* src/lib/ui/Common/Inputs/InputWrapper.svelte generated by Svelte v3.55.0 */

function create_if_block$7(ctx) {
	let div1;
	let t0;
	let div0;
	let t1;
	let div0_style_value;
	let t2;
	let t3;
	let t4;
	let div1_class_value;
	let current;
	let mounted;
	let dispose;
	let if_block0 = create_if_block_5(ctx);
	const default_slot_template = /*#slots*/ ctx[14].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);
	let if_block1 = /*required*/ ctx[2] && create_if_block_4$2();
	let if_block2 = !/*editable*/ ctx[8] && /*validation*/ ctx[9].errorMsg && create_if_block_3$3(ctx);
	let if_block3 = create_if_block_2$3(ctx);
	let if_block4 = /*showDrag*/ ctx[0] && create_if_block_1$4(ctx);

	return {
		c() {
			div1 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			div0 = element("div");
			if (default_slot) default_slot.c();
			t1 = space();
			if (if_block1) if_block1.c();
			t2 = space();
			if (if_block2) if_block2.c();
			t3 = space();
			if (if_block3) if_block3.c();
			t4 = space();
			if (if_block4) if_block4.c();
			attr(div0, "class", "relative max-w-2xl");

			attr(div0, "style", div0_style_value = /*validation*/ ctx[9].errorMsg && !/*editable*/ ctx[8]
			? "--ft-tertiary: 220 38 38;"
			: "");

			attr(div1, "class", div1_class_value = "relative " + (/*editable*/ ctx[8] ? 'pl-16' : ''));
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t0);
			append(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			append(div0, t1);
			if (if_block1) if_block1.m(div0, null);
			append(div1, t2);
			if (if_block2) if_block2.m(div1, null);
			append(div1, t3);
			if (if_block3) if_block3.m(div1, null);
			append(div1, t4);
			if (if_block4) if_block4.m(div1, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div1, "mouseenter", /*mouseenter_handler*/ ctx[21]),
					listen(div1, "mouseleave", /*mouseleave_handler*/ ctx[22])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			{
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*editable, arr_html*/ 288) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div1, t0);
				}
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[13],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null),
						null
					);
				}
			}

			if (/*required*/ ctx[2]) {
				if (if_block1) ; else {
					if_block1 = create_if_block_4$2();
					if_block1.c();
					if_block1.m(div0, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty & /*validation, editable*/ 768 && div0_style_value !== (div0_style_value = /*validation*/ ctx[9].errorMsg && !/*editable*/ ctx[8]
			? "--ft-tertiary: 220 38 38;"
			: "")) {
				attr(div0, "style", div0_style_value);
			}

			if (!/*editable*/ ctx[8] && /*validation*/ ctx[9].errorMsg) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_3$3(ctx);
					if_block2.c();
					if_block2.m(div1, t3);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			{
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty & /*editable, help_html*/ 320) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_2$3(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(div1, t4);
				}
			}

			if (/*showDrag*/ ctx[0]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);

					if (dirty & /*showDrag*/ 1) {
						transition_in(if_block4, 1);
					}
				} else {
					if_block4 = create_if_block_1$4(ctx);
					if_block4.c();
					transition_in(if_block4, 1);
					if_block4.m(div1, null);
				}
			} else if (if_block4) {
				group_outros();

				transition_out(if_block4, 1, 1, () => {
					if_block4 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*editable*/ 256 && div1_class_value !== (div1_class_value = "relative " + (/*editable*/ ctx[8] ? 'pl-16' : ''))) {
				attr(div1, "class", div1_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(default_slot, local);
			transition_in(if_block3);
			transition_in(if_block4);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(default_slot, local);
			transition_out(if_block3);
			transition_out(if_block4);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block0) if_block0.d();
			if (default_slot) default_slot.d(detaching);
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (39:4) {#if true || editable || ((arr_html?.length ?? 0) >= 1 && arr_html?.[0]?.html)}
function create_if_block_5(ctx) {
	let editor;
	let updating_arr_html;
	let current;

	function editor_arr_html_binding(value) {
		/*editor_arr_html_binding*/ ctx[15](value);
	}

	let editor_props = { editable: /*editable*/ ctx[8] };

	if (/*arr_html*/ ctx[5] !== void 0) {
		editor_props.arr_html = /*arr_html*/ ctx[5];
	}

	editor = new Editor({ props: editor_props });
	binding_callbacks.push(() => bind(editor, 'arr_html', editor_arr_html_binding, /*arr_html*/ ctx[5]));

	return {
		c() {
			create_component(editor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(editor, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const editor_changes = {};
			if (dirty & /*editable*/ 256) editor_changes.editable = /*editable*/ ctx[8];

			if (!updating_arr_html && dirty & /*arr_html*/ 32) {
				updating_arr_html = true;
				editor_changes.arr_html = /*arr_html*/ ctx[5];
				add_flush_callback(() => updating_arr_html = false);
			}

			editor.$set(editor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(editor, detaching);
		}
	};
}

// (50:6) {#if required}
function create_if_block_4$2(ctx) {
	let div;
	let t;
	let i;

	return {
		c() {
			div = element("div");
			t = space();
			i = element("i");
			attr(div, "title", "required");
			attr(div, "class", "absolute top-0 mt-px mr-px right-0 bg-transparent w-[0] h-[0] border-t-[22px] border-l-[25px] border-l-transparent inline-block cursor-pointer border-gray-300 ");
			attr(i, "title", "required");
			attr(i, "class", "fa-solid cursor-pointer fa-asterisk absolute text-gray-800 text-xl top-0 right-0 mr-0.5");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			insert(target, t, anchor);
			insert(target, i, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
			if (detaching) detach(t);
			if (detaching) detach(i);
		}
	};
}

// (64:4) {#if !editable && validation.errorMsg}
function create_if_block_3$3(ctx) {
	let div;
	let t_value = /*validation*/ ctx[9].errorMsg + "";
	let t;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "text-red-500 text-sm mt-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*validation*/ 512 && t_value !== (t_value = /*validation*/ ctx[9].errorMsg + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (70:4) {#if true || editable || ((help_html?.length ?? 0) >= 1 && help_html?.[0]?.html)}
function create_if_block_2$3(ctx) {
	let editor;
	let updating_arr_html;
	let current;

	function editor_arr_html_binding_1(value) {
		/*editor_arr_html_binding_1*/ ctx[16](value);
	}

	let editor_props = { editable: /*editable*/ ctx[8] };

	if (/*help_html*/ ctx[6] !== void 0) {
		editor_props.arr_html = /*help_html*/ ctx[6];
	}

	editor = new Editor({ props: editor_props });
	binding_callbacks.push(() => bind(editor, 'arr_html', editor_arr_html_binding_1, /*help_html*/ ctx[6]));

	return {
		c() {
			create_component(editor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(editor, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const editor_changes = {};
			if (dirty & /*editable*/ 256) editor_changes.editable = /*editable*/ ctx[8];

			if (!updating_arr_html && dirty & /*help_html*/ 64) {
				updating_arr_html = true;
				editor_changes.arr_html = /*help_html*/ ctx[6];
				add_flush_callback(() => updating_arr_html = false);
			}

			editor.$set(editor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(editor, detaching);
		}
	};
}

// (74:4) {#if showDrag}
function create_if_block_1$4(ctx) {
	let div;
	let sidemenu;
	let updating_inputsStore;
	let updating_required;
	let updating_menu;
	let updating_show_inputs;
	let current;

	function sidemenu_inputsStore_binding(value) {
		/*sidemenu_inputsStore_binding*/ ctx[17](value);
	}

	function sidemenu_required_binding(value) {
		/*sidemenu_required_binding*/ ctx[18](value);
	}

	function sidemenu_menu_binding(value) {
		/*sidemenu_menu_binding*/ ctx[19](value);
	}

	function sidemenu_show_inputs_binding(value) {
		/*sidemenu_show_inputs_binding*/ ctx[20](value);
	}

	let sidemenu_props = {
		index: /*index*/ ctx[10],
		key: /*key*/ ctx[11]
	};

	if (/*inputsStore*/ ctx[4] !== void 0) {
		sidemenu_props.inputsStore = /*inputsStore*/ ctx[4];
	}

	if (/*required*/ ctx[2] !== void 0) {
		sidemenu_props.required = /*required*/ ctx[2];
	}

	if (/*menu*/ ctx[1] !== void 0) {
		sidemenu_props.menu = /*menu*/ ctx[1];
	}

	if (/*show_inputs*/ ctx[3] !== void 0) {
		sidemenu_props.show_inputs = /*show_inputs*/ ctx[3];
	}

	sidemenu = new SideMenu({ props: sidemenu_props });
	binding_callbacks.push(() => bind(sidemenu, 'inputsStore', sidemenu_inputsStore_binding, /*inputsStore*/ ctx[4]));
	binding_callbacks.push(() => bind(sidemenu, 'required', sidemenu_required_binding, /*required*/ ctx[2]));
	binding_callbacks.push(() => bind(sidemenu, 'menu', sidemenu_menu_binding, /*menu*/ ctx[1]));
	binding_callbacks.push(() => bind(sidemenu, 'show_inputs', sidemenu_show_inputs_binding, /*show_inputs*/ ctx[3]));
	sidemenu.$on("add", /*indexInput*/ ctx[12]);

	return {
		c() {
			div = element("div");
			create_component(sidemenu.$$.fragment);
			attr(div, "class", "absolute top-0 space-x-0.5 -left-5 flex items-center justify-center m-1");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(sidemenu, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const sidemenu_changes = {};
			if (dirty & /*index*/ 1024) sidemenu_changes.index = /*index*/ ctx[10];
			if (dirty & /*key*/ 2048) sidemenu_changes.key = /*key*/ ctx[11];

			if (!updating_inputsStore && dirty & /*inputsStore*/ 16) {
				updating_inputsStore = true;
				sidemenu_changes.inputsStore = /*inputsStore*/ ctx[4];
				add_flush_callback(() => updating_inputsStore = false);
			}

			if (!updating_required && dirty & /*required*/ 4) {
				updating_required = true;
				sidemenu_changes.required = /*required*/ ctx[2];
				add_flush_callback(() => updating_required = false);
			}

			if (!updating_menu && dirty & /*menu*/ 2) {
				updating_menu = true;
				sidemenu_changes.menu = /*menu*/ ctx[1];
				add_flush_callback(() => updating_menu = false);
			}

			if (!updating_show_inputs && dirty & /*show_inputs*/ 8) {
				updating_show_inputs = true;
				sidemenu_changes.show_inputs = /*show_inputs*/ ctx[3];
				add_flush_callback(() => updating_show_inputs = false);
			}

			sidemenu.$set(sidemenu_changes);
		},
		i(local) {
			if (current) return;
			transition_in(sidemenu.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(sidemenu.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(sidemenu);
		}
	};
}

function create_fragment$7(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*showElement*/ ctx[7] && create_if_block$7(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*showElement*/ ctx[7]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*showElement*/ 128) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$7(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	const dispatch = createEventDispatcher();
	let { showDrag = false } = $$props;
	let { showElement = true } = $$props;
	let { menu = false } = $$props;
	let { editable } = $$props;
	let { validation } = $$props;
	let { required = false } = $$props;
	let { index } = $$props;
	let { key } = $$props;
	let { show_inputs } = $$props;
	let { inputsStore } = $$props;
	let { arr_html = [] } = $$props;
	let { help_html = [] } = $$props;

	function indexInput() {
		dispatch("clickAdd", index);
	}

	function editor_arr_html_binding(value) {
		arr_html = value;
		$$invalidate(5, arr_html);
	}

	function editor_arr_html_binding_1(value) {
		help_html = value;
		$$invalidate(6, help_html);
	}

	function sidemenu_inputsStore_binding(value) {
		inputsStore = value;
		$$invalidate(4, inputsStore);
	}

	function sidemenu_required_binding(value) {
		required = value;
		$$invalidate(2, required);
	}

	function sidemenu_menu_binding(value) {
		menu = value;
		$$invalidate(1, menu);
	}

	function sidemenu_show_inputs_binding(value) {
		show_inputs = value;
		$$invalidate(3, show_inputs);
	}

	const mouseenter_handler = () => {
		if (editable) {
			$$invalidate(0, showDrag = true);
		}
	};

	const mouseleave_handler = () => {
		if (menu) ; else {
			$$invalidate(0, showDrag = false);
		}
	};

	$$self.$$set = $$props => {
		if ('showDrag' in $$props) $$invalidate(0, showDrag = $$props.showDrag);
		if ('showElement' in $$props) $$invalidate(7, showElement = $$props.showElement);
		if ('menu' in $$props) $$invalidate(1, menu = $$props.menu);
		if ('editable' in $$props) $$invalidate(8, editable = $$props.editable);
		if ('validation' in $$props) $$invalidate(9, validation = $$props.validation);
		if ('required' in $$props) $$invalidate(2, required = $$props.required);
		if ('index' in $$props) $$invalidate(10, index = $$props.index);
		if ('key' in $$props) $$invalidate(11, key = $$props.key);
		if ('show_inputs' in $$props) $$invalidate(3, show_inputs = $$props.show_inputs);
		if ('inputsStore' in $$props) $$invalidate(4, inputsStore = $$props.inputsStore);
		if ('arr_html' in $$props) $$invalidate(5, arr_html = $$props.arr_html);
		if ('help_html' in $$props) $$invalidate(6, help_html = $$props.help_html);
		if ('$$scope' in $$props) $$invalidate(13, $$scope = $$props.$$scope);
	};

	return [
		showDrag,
		menu,
		required,
		show_inputs,
		inputsStore,
		arr_html,
		help_html,
		showElement,
		editable,
		validation,
		index,
		key,
		indexInput,
		$$scope,
		slots,
		editor_arr_html_binding,
		editor_arr_html_binding_1,
		sidemenu_inputsStore_binding,
		sidemenu_required_binding,
		sidemenu_menu_binding,
		sidemenu_show_inputs_binding,
		mouseenter_handler,
		mouseleave_handler
	];
}

class InputWrapper extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
			showDrag: 0,
			showElement: 7,
			menu: 1,
			editable: 8,
			validation: 9,
			required: 2,
			index: 10,
			key: 11,
			show_inputs: 3,
			inputsStore: 4,
			arr_html: 5,
			help_html: 6
		});
	}
}

/* src/lib/Step.svelte generated by Svelte v3.55.0 */

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[41] = list[i];
	child_ctx[42] = list;
	child_ctx[43] = i;
	return child_ctx;
}

// (65:4) <InputWrapper        key={input.key}        {editable}        bind:show_inputs        bind:inputsStore        bind:required={input.props.fields.validation.required}        validation={input.props.fields.validation}        {index}        bind:arr_html={input.props.arr_html}        bind:help_html={input.props.help_html}        on:clickAdd={getIndex}      >
function create_default_slot$1(ctx) {
	let switch_instance;
	let updating_theme;
	let updating_selected;
	let updating_store;
	let updating_placeholder;
	let updating_label;
	let updating_value;
	let updating_required;
	let updating_errorMsg;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [{ editable: /*editable*/ ctx[6] }, /*input*/ ctx[41]?.props?.fields ?? {}];

	function switch_instance_theme_binding(value) {
		/*switch_instance_theme_binding*/ ctx[16](value);
	}

	function switch_instance_selected_binding(value) {
		/*switch_instance_selected_binding*/ ctx[17](value, /*input*/ ctx[41]);
	}

	function switch_instance_store_binding(value) {
		/*switch_instance_store_binding*/ ctx[18](value, /*input*/ ctx[41]);
	}

	function switch_instance_placeholder_binding(value) {
		/*switch_instance_placeholder_binding*/ ctx[19](value, /*input*/ ctx[41]);
	}

	function switch_instance_label_binding(value) {
		/*switch_instance_label_binding*/ ctx[20](value, /*input*/ ctx[41]);
	}

	function switch_instance_value_binding(value) {
		/*switch_instance_value_binding*/ ctx[21](value, /*input*/ ctx[41]);
	}

	function switch_instance_required_binding(value) {
		/*switch_instance_required_binding*/ ctx[22](value, /*input*/ ctx[41]);
	}

	function switch_instance_errorMsg_binding(value) {
		/*switch_instance_errorMsg_binding*/ ctx[23](value);
	}

	var switch_value = cmpsRegistry[/*input*/ ctx[41]?.type];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		if (/*theme*/ ctx[1] !== void 0) {
			switch_instance_props.theme = /*theme*/ ctx[1];
		}

		if (/*input*/ ctx[41].value !== void 0) {
			switch_instance_props.selected = /*input*/ ctx[41].value;
		}

		if (/*input*/ ctx[41].props.fields.store !== void 0) {
			switch_instance_props.store = /*input*/ ctx[41].props.fields.store;
		}

		if (/*input*/ ctx[41].props.fields.placeholder !== void 0) {
			switch_instance_props.placeholder = /*input*/ ctx[41].props.fields.placeholder;
		}

		if (/*input*/ ctx[41].label !== void 0) {
			switch_instance_props.label = /*input*/ ctx[41].label;
		}

		if (/*input*/ ctx[41].value !== void 0) {
			switch_instance_props.value = /*input*/ ctx[41].value;
		}

		if (/*input*/ ctx[41].props.fields.validation.required !== void 0) {
			switch_instance_props.required = /*input*/ ctx[41].props.fields.validation.required;
		}

		if (/*errorMsg*/ ctx[4] !== void 0) {
			switch_instance_props.errorMsg = /*errorMsg*/ ctx[4];
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
		binding_callbacks.push(() => bind(switch_instance, 'theme', switch_instance_theme_binding, /*theme*/ ctx[1]));
		binding_callbacks.push(() => bind(switch_instance, 'selected', switch_instance_selected_binding, /*input*/ ctx[41].value));
		binding_callbacks.push(() => bind(switch_instance, 'store', switch_instance_store_binding, /*input*/ ctx[41].props.fields.store));
		binding_callbacks.push(() => bind(switch_instance, 'placeholder', switch_instance_placeholder_binding, /*input*/ ctx[41].props.fields.placeholder));
		binding_callbacks.push(() => bind(switch_instance, 'label', switch_instance_label_binding, /*input*/ ctx[41].label));
		binding_callbacks.push(() => bind(switch_instance, 'value', switch_instance_value_binding, /*input*/ ctx[41].value));
		binding_callbacks.push(() => bind(switch_instance, 'required', switch_instance_required_binding, /*input*/ ctx[41].props.fields.validation.required));
		binding_callbacks.push(() => bind(switch_instance, 'errorMsg', switch_instance_errorMsg_binding, /*errorMsg*/ ctx[4]));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			const switch_instance_changes = (dirty[0] & /*editable, inputsStore*/ 576)
			? get_spread_update(switch_instance_spread_levels, [
					dirty[0] & /*editable*/ 64 && { editable: /*editable*/ ctx[6] },
					dirty[0] & /*inputsStore*/ 512 && get_spread_object(/*input*/ ctx[41]?.props?.fields ?? {})
				])
			: {};

			if (!updating_theme && dirty[0] & /*theme*/ 2) {
				updating_theme = true;
				switch_instance_changes.theme = /*theme*/ ctx[1];
				add_flush_callback(() => updating_theme = false);
			}

			if (!updating_selected && dirty[0] & /*inputsStore*/ 512) {
				updating_selected = true;
				switch_instance_changes.selected = /*input*/ ctx[41].value;
				add_flush_callback(() => updating_selected = false);
			}

			if (!updating_store && dirty[0] & /*inputsStore*/ 512) {
				updating_store = true;
				switch_instance_changes.store = /*input*/ ctx[41].props.fields.store;
				add_flush_callback(() => updating_store = false);
			}

			if (!updating_placeholder && dirty[0] & /*inputsStore*/ 512) {
				updating_placeholder = true;
				switch_instance_changes.placeholder = /*input*/ ctx[41].props.fields.placeholder;
				add_flush_callback(() => updating_placeholder = false);
			}

			if (!updating_label && dirty[0] & /*inputsStore*/ 512) {
				updating_label = true;
				switch_instance_changes.label = /*input*/ ctx[41].label;
				add_flush_callback(() => updating_label = false);
			}

			if (!updating_value && dirty[0] & /*inputsStore*/ 512) {
				updating_value = true;
				switch_instance_changes.value = /*input*/ ctx[41].value;
				add_flush_callback(() => updating_value = false);
			}

			if (!updating_required && dirty[0] & /*inputsStore*/ 512) {
				updating_required = true;
				switch_instance_changes.required = /*input*/ ctx[41].props.fields.validation.required;
				add_flush_callback(() => updating_required = false);
			}

			if (!updating_errorMsg && dirty[0] & /*errorMsg*/ 16) {
				updating_errorMsg = true;
				switch_instance_changes.errorMsg = /*errorMsg*/ ctx[4];
				add_flush_callback(() => updating_errorMsg = false);
			}

			if (switch_value !== (switch_value = cmpsRegistry[/*input*/ ctx[41]?.type])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
					binding_callbacks.push(() => bind(switch_instance, 'theme', switch_instance_theme_binding, /*theme*/ ctx[1]));
					binding_callbacks.push(() => bind(switch_instance, 'selected', switch_instance_selected_binding, /*input*/ ctx[41].value));
					binding_callbacks.push(() => bind(switch_instance, 'store', switch_instance_store_binding, /*input*/ ctx[41].props.fields.store));
					binding_callbacks.push(() => bind(switch_instance, 'placeholder', switch_instance_placeholder_binding, /*input*/ ctx[41].props.fields.placeholder));
					binding_callbacks.push(() => bind(switch_instance, 'label', switch_instance_label_binding, /*input*/ ctx[41].label));
					binding_callbacks.push(() => bind(switch_instance, 'value', switch_instance_value_binding, /*input*/ ctx[41].value));
					binding_callbacks.push(() => bind(switch_instance, 'required', switch_instance_required_binding, /*input*/ ctx[41].props.fields.validation.required));
					binding_callbacks.push(() => bind(switch_instance, 'errorMsg', switch_instance_errorMsg_binding, /*errorMsg*/ ctx[4]));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (64:2) {#each inputsStore as input, index}
function create_each_block$1(ctx) {
	let inputwrapper;
	let updating_show_inputs;
	let updating_inputsStore;
	let updating_required;
	let updating_arr_html;
	let updating_help_html;
	let current;

	function inputwrapper_show_inputs_binding(value) {
		/*inputwrapper_show_inputs_binding*/ ctx[24](value);
	}

	function inputwrapper_inputsStore_binding(value) {
		/*inputwrapper_inputsStore_binding*/ ctx[25](value);
	}

	function inputwrapper_required_binding(value) {
		/*inputwrapper_required_binding*/ ctx[26](value, /*input*/ ctx[41]);
	}

	function inputwrapper_arr_html_binding(value) {
		/*inputwrapper_arr_html_binding*/ ctx[27](value, /*input*/ ctx[41]);
	}

	function inputwrapper_help_html_binding(value) {
		/*inputwrapper_help_html_binding*/ ctx[28](value, /*input*/ ctx[41]);
	}

	let inputwrapper_props = {
		key: /*input*/ ctx[41].key,
		editable: /*editable*/ ctx[6],
		validation: /*input*/ ctx[41].props.fields.validation,
		index: /*index*/ ctx[43],
		$$slots: { default: [create_default_slot$1] },
		$$scope: { ctx }
	};

	if (/*show_inputs*/ ctx[2] !== void 0) {
		inputwrapper_props.show_inputs = /*show_inputs*/ ctx[2];
	}

	if (/*inputsStore*/ ctx[9] !== void 0) {
		inputwrapper_props.inputsStore = /*inputsStore*/ ctx[9];
	}

	if (/*input*/ ctx[41].props.fields.validation.required !== void 0) {
		inputwrapper_props.required = /*input*/ ctx[41].props.fields.validation.required;
	}

	if (/*input*/ ctx[41].props.arr_html !== void 0) {
		inputwrapper_props.arr_html = /*input*/ ctx[41].props.arr_html;
	}

	if (/*input*/ ctx[41].props.help_html !== void 0) {
		inputwrapper_props.help_html = /*input*/ ctx[41].props.help_html;
	}

	inputwrapper = new InputWrapper({ props: inputwrapper_props });
	binding_callbacks.push(() => bind(inputwrapper, 'show_inputs', inputwrapper_show_inputs_binding, /*show_inputs*/ ctx[2]));
	binding_callbacks.push(() => bind(inputwrapper, 'inputsStore', inputwrapper_inputsStore_binding, /*inputsStore*/ ctx[9]));
	binding_callbacks.push(() => bind(inputwrapper, 'required', inputwrapper_required_binding, /*input*/ ctx[41].props.fields.validation.required));
	binding_callbacks.push(() => bind(inputwrapper, 'arr_html', inputwrapper_arr_html_binding, /*input*/ ctx[41].props.arr_html));
	binding_callbacks.push(() => bind(inputwrapper, 'help_html', inputwrapper_help_html_binding, /*input*/ ctx[41].props.help_html));
	inputwrapper.$on("clickAdd", /*getIndex*/ ctx[14]);

	return {
		c() {
			create_component(inputwrapper.$$.fragment);
		},
		m(target, anchor) {
			mount_component(inputwrapper, target, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const inputwrapper_changes = {};
			if (dirty[0] & /*inputsStore*/ 512) inputwrapper_changes.key = /*input*/ ctx[41].key;
			if (dirty[0] & /*editable*/ 64) inputwrapper_changes.editable = /*editable*/ ctx[6];
			if (dirty[0] & /*inputsStore*/ 512) inputwrapper_changes.validation = /*input*/ ctx[41].props.fields.validation;

			if (dirty[0] & /*inputsStore, editable, theme, errorMsg*/ 594 | dirty[1] & /*$$scope*/ 8192) {
				inputwrapper_changes.$$scope = { dirty, ctx };
			}

			if (!updating_show_inputs && dirty[0] & /*show_inputs*/ 4) {
				updating_show_inputs = true;
				inputwrapper_changes.show_inputs = /*show_inputs*/ ctx[2];
				add_flush_callback(() => updating_show_inputs = false);
			}

			if (!updating_inputsStore && dirty[0] & /*inputsStore*/ 512) {
				updating_inputsStore = true;
				inputwrapper_changes.inputsStore = /*inputsStore*/ ctx[9];
				add_flush_callback(() => updating_inputsStore = false);
			}

			if (!updating_required && dirty[0] & /*inputsStore*/ 512) {
				updating_required = true;
				inputwrapper_changes.required = /*input*/ ctx[41].props.fields.validation.required;
				add_flush_callback(() => updating_required = false);
			}

			if (!updating_arr_html && dirty[0] & /*inputsStore*/ 512) {
				updating_arr_html = true;
				inputwrapper_changes.arr_html = /*input*/ ctx[41].props.arr_html;
				add_flush_callback(() => updating_arr_html = false);
			}

			if (!updating_help_html && dirty[0] & /*inputsStore*/ 512) {
				updating_help_html = true;
				inputwrapper_changes.help_html = /*input*/ ctx[41].props.help_html;
				add_flush_callback(() => updating_help_html = false);
			}

			inputwrapper.$set(inputwrapper_changes);
		},
		i(local) {
			if (current) return;
			transition_in(inputwrapper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(inputwrapper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(inputwrapper, detaching);
		}
	};
}

// (92:2) {#if editable}
function create_if_block_4$1(ctx) {
	let div2;
	let div1;
	let mounted;
	let dispose;

	return {
		c() {
			div2 = element("div");
			div1 = element("div");

			div1.innerHTML = `<i class="fa-light text-sm fa-plus mt-1"></i> 
        <div>Add Input</div>`;

			attr(div1, "class", "flex items-center text-lg my-9 text-gray-400 capitalize cursor-pointer space-x-2");
			attr(div2, "class", "ml-16 flex");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);

			if (!mounted) {
				dispose = listen(div1, "click", /*click_handler*/ ctx[29]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div2);
			mounted = false;
			dispose();
		}
	};
}

// (148:4) {:else}
function create_else_block$1(ctx) {
	let div;
	let submit0;
	let updating_label;
	let updating_noPrevious;
	let t;
	let submit1;
	let updating_label_1;
	let current;

	function submit0_label_binding_1(value) {
		/*submit0_label_binding_1*/ ctx[35](value);
	}

	function submit0_noPrevious_binding_1(value) {
		/*submit0_noPrevious_binding_1*/ ctx[36](value);
	}

	let submit0_props = {
		editable: /*editable*/ ctx[6],
		theme: /*theme*/ ctx[1],
		previous: true,
		buttonBgColor: /*buttonTextColor*/ ctx[8],
		buttonTextColor: /*buttonBgColor*/ ctx[7]
	};

	if (/*step*/ ctx[0].props.previousBtn !== void 0) {
		submit0_props.label = /*step*/ ctx[0].props.previousBtn;
	}

	if (/*step*/ ctx[0].props.noPrevious !== void 0) {
		submit0_props.noPrevious = /*step*/ ctx[0].props.noPrevious;
	}

	submit0 = new Submit({ props: submit0_props });
	binding_callbacks.push(() => bind(submit0, 'label', submit0_label_binding_1, /*step*/ ctx[0].props.previousBtn));
	binding_callbacks.push(() => bind(submit0, 'noPrevious', submit0_noPrevious_binding_1, /*step*/ ctx[0].props.noPrevious));
	submit0.$on("click", /*previous*/ ctx[12]);

	function submit1_label_binding_1(value) {
		/*submit1_label_binding_1*/ ctx[37](value);
	}

	let submit1_props = {
		editable: /*editable*/ ctx[6],
		theme: /*theme*/ ctx[1],
		next: true,
		buttonBgColor: /*buttonBgColor*/ ctx[7],
		buttonTextColor: /*buttonTextColor*/ ctx[8]
	};

	if (/*step*/ ctx[0].props.nextBtn !== void 0) {
		submit1_props.label = /*step*/ ctx[0].props.nextBtn;
	}

	submit1 = new Submit({ props: submit1_props });
	binding_callbacks.push(() => bind(submit1, 'label', submit1_label_binding_1, /*step*/ ctx[0].props.nextBtn));
	submit1.$on("click", /*next*/ ctx[11]);

	return {
		c() {
			div = element("div");
			create_component(submit0.$$.fragment);
			t = space();
			create_component(submit1.$$.fragment);
			attr(div, "class", "flex");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(submit0, div, null);
			append(div, t);
			mount_component(submit1, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const submit0_changes = {};
			if (dirty[0] & /*editable*/ 64) submit0_changes.editable = /*editable*/ ctx[6];
			if (dirty[0] & /*theme*/ 2) submit0_changes.theme = /*theme*/ ctx[1];
			if (dirty[0] & /*buttonTextColor*/ 256) submit0_changes.buttonBgColor = /*buttonTextColor*/ ctx[8];
			if (dirty[0] & /*buttonBgColor*/ 128) submit0_changes.buttonTextColor = /*buttonBgColor*/ ctx[7];

			if (!updating_label && dirty[0] & /*step*/ 1) {
				updating_label = true;
				submit0_changes.label = /*step*/ ctx[0].props.previousBtn;
				add_flush_callback(() => updating_label = false);
			}

			if (!updating_noPrevious && dirty[0] & /*step*/ 1) {
				updating_noPrevious = true;
				submit0_changes.noPrevious = /*step*/ ctx[0].props.noPrevious;
				add_flush_callback(() => updating_noPrevious = false);
			}

			submit0.$set(submit0_changes);
			const submit1_changes = {};
			if (dirty[0] & /*editable*/ 64) submit1_changes.editable = /*editable*/ ctx[6];
			if (dirty[0] & /*theme*/ 2) submit1_changes.theme = /*theme*/ ctx[1];
			if (dirty[0] & /*buttonBgColor*/ 128) submit1_changes.buttonBgColor = /*buttonBgColor*/ ctx[7];
			if (dirty[0] & /*buttonTextColor*/ 256) submit1_changes.buttonTextColor = /*buttonTextColor*/ ctx[8];

			if (!updating_label_1 && dirty[0] & /*step*/ 1) {
				updating_label_1 = true;
				submit1_changes.label = /*step*/ ctx[0].props.nextBtn;
				add_flush_callback(() => updating_label_1 = false);
			}

			submit1.$set(submit1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(submit0.$$.fragment, local);
			transition_in(submit1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(submit0.$$.fragment, local);
			transition_out(submit1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(submit0);
			destroy_component(submit1);
		}
	};
}

// (138:27) 
function create_if_block_3$2(ctx) {
	let submit;
	let updating_label;
	let current;

	function submit_label_binding_1(value) {
		/*submit_label_binding_1*/ ctx[34](value);
	}

	let submit_props = {
		editable: /*editable*/ ctx[6],
		theme: /*theme*/ ctx[1],
		next: true,
		buttonBgColor: /*buttonBgColor*/ ctx[7],
		buttonTextColor: /*buttonTextColor*/ ctx[8]
	};

	if (/*step*/ ctx[0].props.nextBtn !== void 0) {
		submit_props.label = /*step*/ ctx[0].props.nextBtn;
	}

	submit = new Submit({ props: submit_props });
	binding_callbacks.push(() => bind(submit, 'label', submit_label_binding_1, /*step*/ ctx[0].props.nextBtn));
	submit.$on("click", /*next*/ ctx[11]);

	return {
		c() {
			create_component(submit.$$.fragment);
		},
		m(target, anchor) {
			mount_component(submit, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const submit_changes = {};
			if (dirty[0] & /*editable*/ 64) submit_changes.editable = /*editable*/ ctx[6];
			if (dirty[0] & /*theme*/ 2) submit_changes.theme = /*theme*/ ctx[1];
			if (dirty[0] & /*buttonBgColor*/ 128) submit_changes.buttonBgColor = /*buttonBgColor*/ ctx[7];
			if (dirty[0] & /*buttonTextColor*/ 256) submit_changes.buttonTextColor = /*buttonTextColor*/ ctx[8];

			if (!updating_label && dirty[0] & /*step*/ 1) {
				updating_label = true;
				submit_changes.label = /*step*/ ctx[0].props.nextBtn;
				add_flush_callback(() => updating_label = false);
			}

			submit.$set(submit_changes);
		},
		i(local) {
			if (current) return;
			transition_in(submit.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(submit.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(submit, detaching);
		}
	};
}

// (128:65) 
function create_if_block_2$2(ctx) {
	let submit;
	let updating_label;
	let current;

	function submit_label_binding(value) {
		/*submit_label_binding*/ ctx[33](value);
	}

	let submit_props = {
		editable: /*editable*/ ctx[6],
		theme: /*theme*/ ctx[1],
		next: true,
		buttonBgColor: /*buttonBgColor*/ ctx[7],
		buttonTextColor: /*buttonTextColor*/ ctx[8]
	};

	if (/*step*/ ctx[0].props.nextBtn !== void 0) {
		submit_props.label = /*step*/ ctx[0].props.nextBtn;
	}

	submit = new Submit({ props: submit_props });
	binding_callbacks.push(() => bind(submit, 'label', submit_label_binding, /*step*/ ctx[0].props.nextBtn));
	submit.$on("click", /*submitForm*/ ctx[13]);

	return {
		c() {
			create_component(submit.$$.fragment);
		},
		m(target, anchor) {
			mount_component(submit, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const submit_changes = {};
			if (dirty[0] & /*editable*/ 64) submit_changes.editable = /*editable*/ ctx[6];
			if (dirty[0] & /*theme*/ 2) submit_changes.theme = /*theme*/ ctx[1];
			if (dirty[0] & /*buttonBgColor*/ 128) submit_changes.buttonBgColor = /*buttonBgColor*/ ctx[7];
			if (dirty[0] & /*buttonTextColor*/ 256) submit_changes.buttonTextColor = /*buttonTextColor*/ ctx[8];

			if (!updating_label && dirty[0] & /*step*/ 1) {
				updating_label = true;
				submit_changes.label = /*step*/ ctx[0].props.nextBtn;
				add_flush_callback(() => updating_label = false);
			}

			submit.$set(submit_changes);
		},
		i(local) {
			if (current) return;
			transition_in(submit.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(submit.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(submit, detaching);
		}
	};
}

// (106:4) {#if stepInd == numberOfSteps - 1 && numberOfSteps !== 1}
function create_if_block_1$3(ctx) {
	let div;
	let submit0;
	let updating_label;
	let updating_noPrevious;
	let t;
	let submit1;
	let updating_label_1;
	let current;

	function submit0_label_binding(value) {
		/*submit0_label_binding*/ ctx[30](value);
	}

	function submit0_noPrevious_binding(value) {
		/*submit0_noPrevious_binding*/ ctx[31](value);
	}

	let submit0_props = {
		editable: /*editable*/ ctx[6],
		theme: /*theme*/ ctx[1],
		previous: true,
		buttonBgColor: /*buttonTextColor*/ ctx[8],
		buttonTextColor: /*buttonBgColor*/ ctx[7]
	};

	if (/*step*/ ctx[0].props.previousBtn !== void 0) {
		submit0_props.label = /*step*/ ctx[0].props.previousBtn;
	}

	if (/*step*/ ctx[0].props.noPrevious !== void 0) {
		submit0_props.noPrevious = /*step*/ ctx[0].props.noPrevious;
	}

	submit0 = new Submit({ props: submit0_props });
	binding_callbacks.push(() => bind(submit0, 'label', submit0_label_binding, /*step*/ ctx[0].props.previousBtn));
	binding_callbacks.push(() => bind(submit0, 'noPrevious', submit0_noPrevious_binding, /*step*/ ctx[0].props.noPrevious));
	submit0.$on("click", /*previous*/ ctx[12]);

	function submit1_label_binding(value) {
		/*submit1_label_binding*/ ctx[32](value);
	}

	let submit1_props = {
		editable: /*editable*/ ctx[6],
		theme: /*theme*/ ctx[1],
		next: true,
		buttonBgColor: /*buttonBgColor*/ ctx[7],
		buttonTextColor: /*buttonTextColor*/ ctx[8]
	};

	if (/*step*/ ctx[0].props.nextBtn !== void 0) {
		submit1_props.label = /*step*/ ctx[0].props.nextBtn;
	}

	submit1 = new Submit({ props: submit1_props });
	binding_callbacks.push(() => bind(submit1, 'label', submit1_label_binding, /*step*/ ctx[0].props.nextBtn));
	submit1.$on("click", /*submitForm*/ ctx[13]);

	return {
		c() {
			div = element("div");
			create_component(submit0.$$.fragment);
			t = space();
			create_component(submit1.$$.fragment);
			attr(div, "class", "flex");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(submit0, div, null);
			append(div, t);
			mount_component(submit1, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const submit0_changes = {};
			if (dirty[0] & /*editable*/ 64) submit0_changes.editable = /*editable*/ ctx[6];
			if (dirty[0] & /*theme*/ 2) submit0_changes.theme = /*theme*/ ctx[1];
			if (dirty[0] & /*buttonTextColor*/ 256) submit0_changes.buttonBgColor = /*buttonTextColor*/ ctx[8];
			if (dirty[0] & /*buttonBgColor*/ 128) submit0_changes.buttonTextColor = /*buttonBgColor*/ ctx[7];

			if (!updating_label && dirty[0] & /*step*/ 1) {
				updating_label = true;
				submit0_changes.label = /*step*/ ctx[0].props.previousBtn;
				add_flush_callback(() => updating_label = false);
			}

			if (!updating_noPrevious && dirty[0] & /*step*/ 1) {
				updating_noPrevious = true;
				submit0_changes.noPrevious = /*step*/ ctx[0].props.noPrevious;
				add_flush_callback(() => updating_noPrevious = false);
			}

			submit0.$set(submit0_changes);
			const submit1_changes = {};
			if (dirty[0] & /*editable*/ 64) submit1_changes.editable = /*editable*/ ctx[6];
			if (dirty[0] & /*theme*/ 2) submit1_changes.theme = /*theme*/ ctx[1];
			if (dirty[0] & /*buttonBgColor*/ 128) submit1_changes.buttonBgColor = /*buttonBgColor*/ ctx[7];
			if (dirty[0] & /*buttonTextColor*/ 256) submit1_changes.buttonTextColor = /*buttonTextColor*/ ctx[8];

			if (!updating_label_1 && dirty[0] & /*step*/ 1) {
				updating_label_1 = true;
				submit1_changes.label = /*step*/ ctx[0].props.nextBtn;
				add_flush_callback(() => updating_label_1 = false);
			}

			submit1.$set(submit1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(submit0.$$.fragment, local);
			transition_in(submit1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(submit0.$$.fragment, local);
			transition_out(submit1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(submit0);
			destroy_component(submit1);
		}
	};
}

// (173:2) {#if show_inputs}
function create_if_block$6(ctx) {
	let editorsteps;
	let updating_show;
	let current;

	function editorsteps_show_binding(value) {
		/*editorsteps_show_binding*/ ctx[38](value);
	}

	let editorsteps_props = {};

	if (/*show_inputs*/ ctx[2] !== void 0) {
		editorsteps_props.show = /*show_inputs*/ ctx[2];
	}

	editorsteps = new EditorSteps({ props: editorsteps_props });
	binding_callbacks.push(() => bind(editorsteps, 'show', editorsteps_show_binding, /*show_inputs*/ ctx[2]));
	editorsteps.$on("complete", /*saveInput*/ ctx[10]);

	return {
		c() {
			create_component(editorsteps.$$.fragment);
		},
		m(target, anchor) {
			mount_component(editorsteps, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const editorsteps_changes = {};

			if (!updating_show && dirty[0] & /*show_inputs*/ 4) {
				updating_show = true;
				editorsteps_changes.show = /*show_inputs*/ ctx[2];
				add_flush_callback(() => updating_show = false);
			}

			editorsteps.$set(editorsteps_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editorsteps.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editorsteps.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(editorsteps, detaching);
		}
	};
}

function create_fragment$6(ctx) {
	let div1;
	let t0;
	let t1;
	let div0;
	let current_block_type_index;
	let if_block1;
	let div0_class_value;
	let t2;
	let current;
	let each_value = /*inputsStore*/ ctx[9];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block0 = /*editable*/ ctx[6] && create_if_block_4$1(ctx);
	const if_block_creators = [create_if_block_1$3, create_if_block_2$2, create_if_block_3$2, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*stepInd*/ ctx[3] == /*numberOfSteps*/ ctx[5] - 1 && /*numberOfSteps*/ ctx[5] !== 1) return 0;
		if (/*stepInd*/ ctx[3] == /*numberOfSteps*/ ctx[5] - 1 && /*numberOfSteps*/ ctx[5] == 1) return 1;
		if (/*stepInd*/ ctx[3] == 0) return 2;
		return 3;
	}

	current_block_type_index = select_block_type(ctx);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block2 = /*show_inputs*/ ctx[2] && create_if_block$6(ctx);

	return {
		c() {
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			div0 = element("div");
			if_block1.c();
			t2 = space();
			if (if_block2) if_block2.c();
			attr(div0, "class", div0_class_value = "" + ((/*editable*/ ctx[6] ? 'pl-16' : '') + " mb-4 mt-10"));
		},
		m(target, anchor) {
			insert(target, div1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			append(div1, t0);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t1);
			append(div1, div0);
			if_blocks[current_block_type_index].m(div0, null);
			append(div1, t2);
			if (if_block2) if_block2.m(div1, null);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*inputsStore, editable, show_inputs, getIndex, theme, errorMsg*/ 16982) {
				each_value = /*inputsStore*/ ctx[9];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div1, t0);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (/*editable*/ ctx[6]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_4$1(ctx);
					if_block0.c();
					if_block0.m(div1, t1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(div0, null);
			}

			if (!current || dirty[0] & /*editable*/ 64 && div0_class_value !== (div0_class_value = "" + ((/*editable*/ ctx[6] ? 'pl-16' : '') + " mb-4 mt-10"))) {
				attr(div0, "class", div0_class_value);
			}

			if (/*show_inputs*/ ctx[2]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*show_inputs*/ 4) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block$6(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div1, null);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_each(each_blocks, detaching);
			if (if_block0) if_block0.d();
			if_blocks[current_block_type_index].d();
			if (if_block2) if_block2.d();
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let inputsStore;
	let inputIndex;
	let { stepsList } = $$props;
	let { numberOfSteps } = $$props;
	const dispatch = createEventDispatcher();
	let { step } = $$props;
	step.props ||= {};
	step.props.previousBtn ||= "Back";
	step.props.nextBtn ||= "Next";
	let { editable } = $$props;
	let { theme } = $$props;
	let { show_inputs = false } = $$props;
	let { stepInd = stepsList.indexOf(step) } = $$props;
	let { buttonBgColor } = $$props;
	let { buttonTextColor } = $$props;
	let { errorMsg } = $$props;

	function saveInput(evt) {
		const elem = { ...evt.detail, key: randomString() };
		inputsStore.splice(inputIndex, 0, elem);
		($$invalidate(9, inputsStore), $$invalidate(0, step));
		inputIndex++;
	}

	function next() {
		let valid = true;

		for (const input of step.inputs) {
			if (input.props.fields.validation.required == true) {
				if (input.value === "" || input.value == undefined) {
					valid = false;
					input.props.fields.validation.errorMsg = "Field is required";
				} else {
					input.props.fields.validation.errorMsg = "";
				}
			}
		}

		$$invalidate(0, step);
		if (valid) $$invalidate(3, stepInd++, stepInd);
	}

	function previous() {
		$$invalidate(3, stepInd--, stepInd);
	}

	function submitForm() {
		dispatch("submit");
	}

	function getIndex(index) {
		inputIndex = index.detail + 1;
	}

	function switch_instance_theme_binding(value) {
		theme = value;
		$$invalidate(1, theme);
	}

	function switch_instance_selected_binding(value, input) {
		if ($$self.$$.not_equal(input.value, value)) {
			input.value = value;
			($$invalidate(9, inputsStore), $$invalidate(0, step));
		}
	}

	function switch_instance_store_binding(value, input) {
		if ($$self.$$.not_equal(input.props.fields.store, value)) {
			input.props.fields.store = value;
			($$invalidate(9, inputsStore), $$invalidate(0, step));
		}
	}

	function switch_instance_placeholder_binding(value, input) {
		if ($$self.$$.not_equal(input.props.fields.placeholder, value)) {
			input.props.fields.placeholder = value;
			($$invalidate(9, inputsStore), $$invalidate(0, step));
		}
	}

	function switch_instance_label_binding(value, input) {
		if ($$self.$$.not_equal(input.label, value)) {
			input.label = value;
			($$invalidate(9, inputsStore), $$invalidate(0, step));
		}
	}

	function switch_instance_value_binding(value, input) {
		if ($$self.$$.not_equal(input.value, value)) {
			input.value = value;
			($$invalidate(9, inputsStore), $$invalidate(0, step));
		}
	}

	function switch_instance_required_binding(value, input) {
		if ($$self.$$.not_equal(input.props.fields.validation.required, value)) {
			input.props.fields.validation.required = value;
			($$invalidate(9, inputsStore), $$invalidate(0, step));
		}
	}

	function switch_instance_errorMsg_binding(value) {
		errorMsg = value;
		$$invalidate(4, errorMsg);
	}

	function inputwrapper_show_inputs_binding(value) {
		show_inputs = value;
		$$invalidate(2, show_inputs);
	}

	function inputwrapper_inputsStore_binding(value) {
		inputsStore = value;
		($$invalidate(9, inputsStore), $$invalidate(0, step));
	}

	function inputwrapper_required_binding(value, input) {
		if ($$self.$$.not_equal(input.props.fields.validation.required, value)) {
			input.props.fields.validation.required = value;
			($$invalidate(9, inputsStore), $$invalidate(0, step));
		}
	}

	function inputwrapper_arr_html_binding(value, input) {
		if ($$self.$$.not_equal(input.props.arr_html, value)) {
			input.props.arr_html = value;
			($$invalidate(9, inputsStore), $$invalidate(0, step));
		}
	}

	function inputwrapper_help_html_binding(value, input) {
		if ($$self.$$.not_equal(input.props.help_html, value)) {
			input.props.help_html = value;
			($$invalidate(9, inputsStore), $$invalidate(0, step));
		}
	}

	const click_handler = () => {
		$$invalidate(2, show_inputs = true);
	};

	function submit0_label_binding(value) {
		if ($$self.$$.not_equal(step.props.previousBtn, value)) {
			step.props.previousBtn = value;
			$$invalidate(0, step);
		}
	}

	function submit0_noPrevious_binding(value) {
		if ($$self.$$.not_equal(step.props.noPrevious, value)) {
			step.props.noPrevious = value;
			$$invalidate(0, step);
		}
	}

	function submit1_label_binding(value) {
		if ($$self.$$.not_equal(step.props.nextBtn, value)) {
			step.props.nextBtn = value;
			$$invalidate(0, step);
		}
	}

	function submit_label_binding(value) {
		if ($$self.$$.not_equal(step.props.nextBtn, value)) {
			step.props.nextBtn = value;
			$$invalidate(0, step);
		}
	}

	function submit_label_binding_1(value) {
		if ($$self.$$.not_equal(step.props.nextBtn, value)) {
			step.props.nextBtn = value;
			$$invalidate(0, step);
		}
	}

	function submit0_label_binding_1(value) {
		if ($$self.$$.not_equal(step.props.previousBtn, value)) {
			step.props.previousBtn = value;
			$$invalidate(0, step);
		}
	}

	function submit0_noPrevious_binding_1(value) {
		if ($$self.$$.not_equal(step.props.noPrevious, value)) {
			step.props.noPrevious = value;
			$$invalidate(0, step);
		}
	}

	function submit1_label_binding_1(value) {
		if ($$self.$$.not_equal(step.props.nextBtn, value)) {
			step.props.nextBtn = value;
			$$invalidate(0, step);
		}
	}

	function editorsteps_show_binding(value) {
		show_inputs = value;
		$$invalidate(2, show_inputs);
	}

	$$self.$$set = $$props => {
		if ('stepsList' in $$props) $$invalidate(15, stepsList = $$props.stepsList);
		if ('numberOfSteps' in $$props) $$invalidate(5, numberOfSteps = $$props.numberOfSteps);
		if ('step' in $$props) $$invalidate(0, step = $$props.step);
		if ('editable' in $$props) $$invalidate(6, editable = $$props.editable);
		if ('theme' in $$props) $$invalidate(1, theme = $$props.theme);
		if ('show_inputs' in $$props) $$invalidate(2, show_inputs = $$props.show_inputs);
		if ('stepInd' in $$props) $$invalidate(3, stepInd = $$props.stepInd);
		if ('buttonBgColor' in $$props) $$invalidate(7, buttonBgColor = $$props.buttonBgColor);
		if ('buttonTextColor' in $$props) $$invalidate(8, buttonTextColor = $$props.buttonTextColor);
		if ('errorMsg' in $$props) $$invalidate(4, errorMsg = $$props.errorMsg);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*step*/ 1) {
			$$invalidate(9, inputsStore = step?.inputs);
		}

		if ($$self.$$.dirty[0] & /*inputsStore*/ 512) {
			inputIndex = inputsStore?.length;
		}
	};

	return [
		step,
		theme,
		show_inputs,
		stepInd,
		errorMsg,
		numberOfSteps,
		editable,
		buttonBgColor,
		buttonTextColor,
		inputsStore,
		saveInput,
		next,
		previous,
		submitForm,
		getIndex,
		stepsList,
		switch_instance_theme_binding,
		switch_instance_selected_binding,
		switch_instance_store_binding,
		switch_instance_placeholder_binding,
		switch_instance_label_binding,
		switch_instance_value_binding,
		switch_instance_required_binding,
		switch_instance_errorMsg_binding,
		inputwrapper_show_inputs_binding,
		inputwrapper_inputsStore_binding,
		inputwrapper_required_binding,
		inputwrapper_arr_html_binding,
		inputwrapper_help_html_binding,
		click_handler,
		submit0_label_binding,
		submit0_noPrevious_binding,
		submit1_label_binding,
		submit_label_binding,
		submit_label_binding_1,
		submit0_label_binding_1,
		submit0_noPrevious_binding_1,
		submit1_label_binding_1,
		editorsteps_show_binding
	];
}

class Step extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$6,
			create_fragment$6,
			safe_not_equal,
			{
				stepsList: 15,
				numberOfSteps: 5,
				step: 0,
				editable: 6,
				theme: 1,
				show_inputs: 2,
				stepInd: 3,
				buttonBgColor: 7,
				buttonTextColor: 8,
				errorMsg: 4
			},
			null,
			[-1, -1]
		);
	}
}

/* src/lib/ui/Common/Steps/StepMenu.svelte generated by Svelte v3.55.0 */

function create_if_block$5(ctx) {
	let div;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");

			div.innerHTML = `<i class="fa-light fa-trash-can mt-1"></i> 
      <span class="text-sm ">delete</span>`;

			attr(div, "class", "flex space-x-3 bg-white hover:bg-gray-50 dark:text-gray-300 cursor-pointer items-center w-32 text-sm p-3 capitalize shadow text-gray-500 ");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(div, "click", /*deleteStep*/ ctx[2]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$5(ctx) {
	let div1;
	let t0;
	let div0;
	let mounted;
	let dispose;
	let if_block = /*numberOfSteps*/ ctx[1] !== 1 && create_if_block$5(ctx);

	return {
		c() {
			div1 = element("div");
			if (if_block) if_block.c();
			t0 = space();
			div0 = element("div");

			div0.innerHTML = `<i class="fa-light fa-clone mt-1"></i> 
    <span class="text-sm ">duplicate</span>`;

			attr(div0, "class", "flex space-x-3 bg-white hover:bg-gray-50 dark:text-gray-300 cursor-pointer items-center w-32 text-sm p-3 capitalize shadow text-gray-500 ");
			attr(div1, "class", "flex flex-col z-20 absolute top-10 -left-3 rounded ");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			if (if_block) if_block.m(div1, null);
			append(div1, t0);
			append(div1, div0);

			if (!mounted) {
				dispose = [
					listen(div0, "click", /*duplicate*/ ctx[3]),
					action_destroyer(clickOutside.call(null, div1)),
					listen(div1, "click_outside", /*click_outside_handler*/ ctx[7])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*numberOfSteps*/ ctx[1] !== 1) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$5(ctx);
					if_block.c();
					if_block.m(div1, t0);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { stepInd } = $$props;
	let { stepMenu } = $$props;
	let { step } = $$props;

	function deleteStep() {
		dispatch("deleteStep", stepInd);
	}

	let { stepsList } = $$props;
	let { numberOfSteps } = $$props;

	function duplicate() {
		stepsList.splice(stepInd + 1, 0, step);
		$$invalidate(4, stepsList);
	}

	const click_outside_handler = () => {
		$$invalidate(0, stepMenu = false);
	};

	$$self.$$set = $$props => {
		if ('stepInd' in $$props) $$invalidate(5, stepInd = $$props.stepInd);
		if ('stepMenu' in $$props) $$invalidate(0, stepMenu = $$props.stepMenu);
		if ('step' in $$props) $$invalidate(6, step = $$props.step);
		if ('stepsList' in $$props) $$invalidate(4, stepsList = $$props.stepsList);
		if ('numberOfSteps' in $$props) $$invalidate(1, numberOfSteps = $$props.numberOfSteps);
	};

	return [
		stepMenu,
		numberOfSteps,
		deleteStep,
		duplicate,
		stepsList,
		stepInd,
		step,
		click_outside_handler
	];
}

class StepMenu extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
			stepInd: 5,
			stepMenu: 0,
			step: 6,
			stepsList: 4,
			numberOfSteps: 1
		});
	}
}

/* src/lib/ui/Common/Steps/SideStepMenu.svelte generated by Svelte v3.55.0 */

function create_if_block_2$1(ctx) {
	let div1;
	let div0;
	let t;
	let mounted;
	let dispose;
	let if_block = /*showDelete*/ ctx[0] && create_if_block_3$1();

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			div0.innerHTML = `<i class="fa-light fa-trash-can text-lg"></i>`;
			t = space();
			if (if_block) if_block.c();
			attr(div0, "class", "cursor-pointer text-gray-400 hover:text-gray-600 p-1");
			attr(div1, "class", "flex flex-col relative ");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div1, t);
			if (if_block) if_block.m(div1, null);

			if (!mounted) {
				dispose = [
					listen(div0, "click", /*deleteStep*/ ctx[7]),
					listen(div0, "mouseenter", /*mouseenter_handler*/ ctx[8]),
					listen(div0, "mouseleave", /*mouseleave_handler*/ ctx[9])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*showDelete*/ ctx[0]) {
				if (if_block) ; else {
					if_block = create_if_block_3$1();
					if_block.c();
					if_block.m(div1, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (30:6) {#if showDelete}
function create_if_block_3$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Delete Step";
			attr(div, "class", "w-20 text-xs p-2 text-center capitalize bg-gray-600 text-white rounded absolute top-10 -left-3");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (57:4) {#if showMenu}
function create_if_block_1$2(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Show menu";
			attr(div, "class", "w-20 text-xs bg-gray-600 text-white rounded absolute top-10 p-1 text-center capitalize -left-3");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (64:4) {#if stepMenu}
function create_if_block$4(ctx) {
	let stepmenu;
	let updating_stepMenu;
	let updating_stepInd;
	let updating_stepsList;
	let updating_step;
	let current;

	function stepmenu_stepMenu_binding(value) {
		/*stepmenu_stepMenu_binding*/ ctx[13](value);
	}

	function stepmenu_stepInd_binding(value) {
		/*stepmenu_stepInd_binding*/ ctx[14](value);
	}

	function stepmenu_stepsList_binding(value) {
		/*stepmenu_stepsList_binding*/ ctx[15](value);
	}

	function stepmenu_step_binding(value) {
		/*stepmenu_step_binding*/ ctx[16](value);
	}

	let stepmenu_props = { numberOfSteps: /*numberOfSteps*/ ctx[6] };

	if (/*stepMenu*/ ctx[2] !== void 0) {
		stepmenu_props.stepMenu = /*stepMenu*/ ctx[2];
	}

	if (/*stepInd*/ ctx[3] !== void 0) {
		stepmenu_props.stepInd = /*stepInd*/ ctx[3];
	}

	if (/*stepsList*/ ctx[4] !== void 0) {
		stepmenu_props.stepsList = /*stepsList*/ ctx[4];
	}

	if (/*step*/ ctx[5] !== void 0) {
		stepmenu_props.step = /*step*/ ctx[5];
	}

	stepmenu = new StepMenu({ props: stepmenu_props });
	binding_callbacks.push(() => bind(stepmenu, 'stepMenu', stepmenu_stepMenu_binding, /*stepMenu*/ ctx[2]));
	binding_callbacks.push(() => bind(stepmenu, 'stepInd', stepmenu_stepInd_binding, /*stepInd*/ ctx[3]));
	binding_callbacks.push(() => bind(stepmenu, 'stepsList', stepmenu_stepsList_binding, /*stepsList*/ ctx[4]));
	binding_callbacks.push(() => bind(stepmenu, 'step', stepmenu_step_binding, /*step*/ ctx[5]));
	stepmenu.$on("deleteStep", /*deleteStep*/ ctx[7]);

	return {
		c() {
			create_component(stepmenu.$$.fragment);
		},
		m(target, anchor) {
			mount_component(stepmenu, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const stepmenu_changes = {};
			if (dirty & /*numberOfSteps*/ 64) stepmenu_changes.numberOfSteps = /*numberOfSteps*/ ctx[6];

			if (!updating_stepMenu && dirty & /*stepMenu*/ 4) {
				updating_stepMenu = true;
				stepmenu_changes.stepMenu = /*stepMenu*/ ctx[2];
				add_flush_callback(() => updating_stepMenu = false);
			}

			if (!updating_stepInd && dirty & /*stepInd*/ 8) {
				updating_stepInd = true;
				stepmenu_changes.stepInd = /*stepInd*/ ctx[3];
				add_flush_callback(() => updating_stepInd = false);
			}

			if (!updating_stepsList && dirty & /*stepsList*/ 16) {
				updating_stepsList = true;
				stepmenu_changes.stepsList = /*stepsList*/ ctx[4];
				add_flush_callback(() => updating_stepsList = false);
			}

			if (!updating_step && dirty & /*step*/ 32) {
				updating_step = true;
				stepmenu_changes.step = /*step*/ ctx[5];
				add_flush_callback(() => updating_step = false);
			}

			stepmenu.$set(stepmenu_changes);
		},
		i(local) {
			if (current) return;
			transition_in(stepmenu.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(stepmenu.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(stepmenu, detaching);
		}
	};
}

function create_fragment$4(ctx) {
	let div2;
	let t0;
	let div1;
	let div0;
	let t1;
	let t2;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*numberOfSteps*/ ctx[6] !== 1 && create_if_block_2$1(ctx);
	let if_block1 = /*showMenu*/ ctx[1] && create_if_block_1$2();
	let if_block2 = /*stepMenu*/ ctx[2] && create_if_block$4(ctx);

	return {
		c() {
			div2 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			div1 = element("div");
			div0 = element("div");
			div0.innerHTML = `<i class="fa-light fa-ellipsis-vertical px-2 text-xl"></i>`;
			t1 = space();
			if (if_block1) if_block1.c();
			t2 = space();
			if (if_block2) if_block2.c();
			attr(div0, "data-name", "showMenu");
			attr(div0, "class", "cursor-pointer text-gray-400 hover:text-gray-600 p-1");
			attr(div1, "class", "flex flex-col relative");
			attr(div2, "class", "flex");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			if (if_block0) if_block0.m(div2, null);
			append(div2, t0);
			append(div2, div1);
			append(div1, div0);
			append(div1, t1);
			if (if_block1) if_block1.m(div1, null);
			append(div1, t2);
			if (if_block2) if_block2.m(div1, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div0, "click", prevent_default(/*click_handler*/ ctx[10])),
					listen(div0, "mouseenter", /*mouseenter_handler_1*/ ctx[11]),
					listen(div0, "mouseleave", /*mouseleave_handler_1*/ ctx[12])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*numberOfSteps*/ ctx[6] !== 1) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2$1(ctx);
					if_block0.c();
					if_block0.m(div2, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*showMenu*/ ctx[1]) {
				if (if_block1) ; else {
					if_block1 = create_if_block_1$2();
					if_block1.c();
					if_block1.m(div1, t2);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*stepMenu*/ ctx[2]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*stepMenu*/ 4) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block$4(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div1, null);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let { showDelete = false } = $$props;
	let { showMenu = false } = $$props;
	let { stepMenu } = $$props;
	let { stepInd } = $$props;
	let { stepsList } = $$props;
	let { step } = $$props;
	let { numberOfSteps } = $$props;

	function deleteStep() {
		if (!confirm("Are you sure you want to delete this step?")) return;
		stepsList.splice(stepInd + 1, 1);
		$$invalidate(4, stepsList);
	}

	const mouseenter_handler = () => $$invalidate(0, showDelete = true);
	const mouseleave_handler = () => $$invalidate(0, showDelete = false);

	const click_handler = () => {
		$$invalidate(2, stepMenu = !stepMenu);
		$$invalidate(1, showMenu = false);
	};

	const mouseenter_handler_1 = () => {
		if (!stepMenu) {
			$$invalidate(1, showMenu = true);
		}
	};

	const mouseleave_handler_1 = () => $$invalidate(1, showMenu = false);

	function stepmenu_stepMenu_binding(value) {
		stepMenu = value;
		$$invalidate(2, stepMenu);
	}

	function stepmenu_stepInd_binding(value) {
		stepInd = value;
		$$invalidate(3, stepInd);
	}

	function stepmenu_stepsList_binding(value) {
		stepsList = value;
		$$invalidate(4, stepsList);
	}

	function stepmenu_step_binding(value) {
		step = value;
		$$invalidate(5, step);
	}

	$$self.$$set = $$props => {
		if ('showDelete' in $$props) $$invalidate(0, showDelete = $$props.showDelete);
		if ('showMenu' in $$props) $$invalidate(1, showMenu = $$props.showMenu);
		if ('stepMenu' in $$props) $$invalidate(2, stepMenu = $$props.stepMenu);
		if ('stepInd' in $$props) $$invalidate(3, stepInd = $$props.stepInd);
		if ('stepsList' in $$props) $$invalidate(4, stepsList = $$props.stepsList);
		if ('step' in $$props) $$invalidate(5, step = $$props.step);
		if ('numberOfSteps' in $$props) $$invalidate(6, numberOfSteps = $$props.numberOfSteps);
	};

	return [
		showDelete,
		showMenu,
		stepMenu,
		stepInd,
		stepsList,
		step,
		numberOfSteps,
		deleteStep,
		mouseenter_handler,
		mouseleave_handler,
		click_handler,
		mouseenter_handler_1,
		mouseleave_handler_1,
		stepmenu_stepMenu_binding,
		stepmenu_stepInd_binding,
		stepmenu_stepsList_binding,
		stepmenu_step_binding
	];
}

class SideStepMenu extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			showDelete: 0,
			showMenu: 1,
			stepMenu: 2,
			stepInd: 3,
			stepsList: 4,
			step: 5,
			numberOfSteps: 6
		});
	}
}

/* src/lib/ui/Common/Steps/StepWrapper.svelte generated by Svelte v3.55.0 */

function create_if_block$3(ctx) {
	let div;
	let sidestepmenu;
	let updating_stepMenu;
	let updating_stepInd;
	let updating_stepsList;
	let updating_step;
	let div_class_value;
	let current;

	function sidestepmenu_stepMenu_binding(value) {
		/*sidestepmenu_stepMenu_binding*/ ctx[9](value);
	}

	function sidestepmenu_stepInd_binding(value) {
		/*sidestepmenu_stepInd_binding*/ ctx[10](value);
	}

	function sidestepmenu_stepsList_binding(value) {
		/*sidestepmenu_stepsList_binding*/ ctx[11](value);
	}

	function sidestepmenu_step_binding(value) {
		/*sidestepmenu_step_binding*/ ctx[12](value);
	}

	let sidestepmenu_props = { numberOfSteps: /*numberOfSteps*/ ctx[6] };

	if (/*stepMenu*/ ctx[1] !== void 0) {
		sidestepmenu_props.stepMenu = /*stepMenu*/ ctx[1];
	}

	if (/*stepInd*/ ctx[2] !== void 0) {
		sidestepmenu_props.stepInd = /*stepInd*/ ctx[2];
	}

	if (/*stepsList*/ ctx[3] !== void 0) {
		sidestepmenu_props.stepsList = /*stepsList*/ ctx[3];
	}

	if (/*step*/ ctx[4] !== void 0) {
		sidestepmenu_props.step = /*step*/ ctx[4];
	}

	sidestepmenu = new SideStepMenu({ props: sidestepmenu_props });
	binding_callbacks.push(() => bind(sidestepmenu, 'stepMenu', sidestepmenu_stepMenu_binding, /*stepMenu*/ ctx[1]));
	binding_callbacks.push(() => bind(sidestepmenu, 'stepInd', sidestepmenu_stepInd_binding, /*stepInd*/ ctx[2]));
	binding_callbacks.push(() => bind(sidestepmenu, 'stepsList', sidestepmenu_stepsList_binding, /*stepsList*/ ctx[3]));
	binding_callbacks.push(() => bind(sidestepmenu, 'step', sidestepmenu_step_binding, /*step*/ ctx[4]));

	return {
		c() {
			div = element("div");
			create_component(sidestepmenu.$$.fragment);

			attr(div, "class", div_class_value = "absolute " + (/*numberOfSteps*/ ctx[6] == 1 ? ' left-0.5 top-10 ' : '') + " " + (/*stepInd*/ ctx[2] == /*numberOfSteps*/ ctx[6] - 1
			? ' bottom-10 -left-6'
			: 'bottom-5 -left-6 ') + " space-x-0.5 flex items-center justify-center m-1 pl-5");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(sidestepmenu, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const sidestepmenu_changes = {};
			if (dirty & /*numberOfSteps*/ 64) sidestepmenu_changes.numberOfSteps = /*numberOfSteps*/ ctx[6];

			if (!updating_stepMenu && dirty & /*stepMenu*/ 2) {
				updating_stepMenu = true;
				sidestepmenu_changes.stepMenu = /*stepMenu*/ ctx[1];
				add_flush_callback(() => updating_stepMenu = false);
			}

			if (!updating_stepInd && dirty & /*stepInd*/ 4) {
				updating_stepInd = true;
				sidestepmenu_changes.stepInd = /*stepInd*/ ctx[2];
				add_flush_callback(() => updating_stepInd = false);
			}

			if (!updating_stepsList && dirty & /*stepsList*/ 8) {
				updating_stepsList = true;
				sidestepmenu_changes.stepsList = /*stepsList*/ ctx[3];
				add_flush_callback(() => updating_stepsList = false);
			}

			if (!updating_step && dirty & /*step*/ 16) {
				updating_step = true;
				sidestepmenu_changes.step = /*step*/ ctx[4];
				add_flush_callback(() => updating_step = false);
			}

			sidestepmenu.$set(sidestepmenu_changes);

			if (!current || dirty & /*numberOfSteps, stepInd*/ 68 && div_class_value !== (div_class_value = "absolute " + (/*numberOfSteps*/ ctx[6] == 1 ? ' left-0.5 top-10 ' : '') + " " + (/*stepInd*/ ctx[2] == /*numberOfSteps*/ ctx[6] - 1
			? ' bottom-10 -left-6'
			: 'bottom-5 -left-6 ') + " space-x-0.5 flex items-center justify-center m-1 pl-5")) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(sidestepmenu.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(sidestepmenu.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(sidestepmenu);
		}
	};
}

function create_fragment$3(ctx) {
	let div;
	let t;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);
	let if_block = /*stepper*/ ctx[0] && /*stepInd*/ ctx[2] < /*numberOfSteps*/ ctx[6] - 1 && create_if_block$3(ctx);

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			t = space();
			if (if_block) if_block.c();
			attr(div, "class", "relative my-3 p-3 ");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			append(div, t);
			if (if_block) if_block.m(div, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div, "mouseenter", /*mouseenter_handler*/ ctx[13]),
					listen(div, "mouseleave", /*mouseleave_handler*/ ctx[14])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, null),
						null
					);
				}
			}

			if (/*stepper*/ ctx[0] && /*stepInd*/ ctx[2] < /*numberOfSteps*/ ctx[6] - 1) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*stepper, stepInd, numberOfSteps*/ 69) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { editable } = $$props;
	let { stepper } = $$props;
	let { stepMenu } = $$props;
	let { stepInd } = $$props;
	let { stepsList } = $$props;
	let { step } = $$props;
	let { numberOfSteps } = $$props;

	function sidestepmenu_stepMenu_binding(value) {
		stepMenu = value;
		$$invalidate(1, stepMenu);
	}

	function sidestepmenu_stepInd_binding(value) {
		stepInd = value;
		$$invalidate(2, stepInd);
	}

	function sidestepmenu_stepsList_binding(value) {
		stepsList = value;
		$$invalidate(3, stepsList);
	}

	function sidestepmenu_step_binding(value) {
		step = value;
		$$invalidate(4, step);
	}

	const mouseenter_handler = () => {
		if (editable) {
			$$invalidate(0, stepper = true);
		}
	};

	const mouseleave_handler = () => {
		if (stepMenu) {
			$$invalidate(0, stepper = true);
		} else {
			$$invalidate(0, stepper = false);
		}
	};

	$$self.$$set = $$props => {
		if ('editable' in $$props) $$invalidate(5, editable = $$props.editable);
		if ('stepper' in $$props) $$invalidate(0, stepper = $$props.stepper);
		if ('stepMenu' in $$props) $$invalidate(1, stepMenu = $$props.stepMenu);
		if ('stepInd' in $$props) $$invalidate(2, stepInd = $$props.stepInd);
		if ('stepsList' in $$props) $$invalidate(3, stepsList = $$props.stepsList);
		if ('step' in $$props) $$invalidate(4, step = $$props.step);
		if ('numberOfSteps' in $$props) $$invalidate(6, numberOfSteps = $$props.numberOfSteps);
		if ('$$scope' in $$props) $$invalidate(7, $$scope = $$props.$$scope);
	};

	return [
		stepper,
		stepMenu,
		stepInd,
		stepsList,
		step,
		editable,
		numberOfSteps,
		$$scope,
		slots,
		sidestepmenu_stepMenu_binding,
		sidestepmenu_stepInd_binding,
		sidestepmenu_stepsList_binding,
		sidestepmenu_step_binding,
		mouseenter_handler,
		mouseleave_handler
	];
}

class StepWrapper extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
			editable: 5,
			stepper: 0,
			stepMenu: 1,
			stepInd: 2,
			stepsList: 3,
			step: 4,
			numberOfSteps: 6
		});
	}
}

/* src/lib/ui/Common/Steps/StepLine.svelte generated by Svelte v3.55.0 */

function create_else_block(ctx) {
	let div1;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");

			div1.innerHTML = `<i class="fa-light fa-plus text-sm mt-0.5"></i> 
          <div class="">Add step</div>`;

			attr(div1, "class", "cursor-pointer flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 space-x-2 p-2 text-gray-400 px-8 capitalize");
		},
		m(target, anchor) {
			insert(target, div1, anchor);

			if (!mounted) {
				dispose = listen(div1, "click", /*click_handler*/ ctx[8]);
				mounted = true;
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
			mounted = false;
			dispose();
		}
	};
}

// (35:6) {#if withMessage && stepInd == numberOfSteps - 1}
function create_if_block_1$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "class", "flex-auto border-t-2 border-dashed border-gray-300 h-1");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (49:8) {#if stepInd == numberOfSteps - 1}
function create_if_block$2(ctx) {
	let div1;
	let span;
	let t0;
	let t1;
	let label_1;
	let input;
	let t2;
	let div0;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");
			span = element("span");
			t0 = text(/*label*/ ctx[7]);
			t1 = space();
			label_1 = element("label");
			input = element("input");
			t2 = space();
			div0 = element("div");
			attr(span, "class", "text-sm font-medium ");
			attr(input, "type", "checkbox");
			input.value = "";
			attr(input, "id", "toggle");
			attr(input, "class", "sr-only peer");
			input.checked = /*withMessage*/ ctx[5];
			attr(div0, "class", "w-8 h-4 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-focus:ring-1 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600");
			attr(label_1, "for", "toggle");
			attr(label_1, "class", "inline-flex relative items-center cursor-pointer");
			attr(div1, "class", "flex justify-between space-x-2 dark:text-gray-300 cursor-pointer items-center text-sm p-2 capitalize text-gray-500 font-medium");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, span);
			append(span, t0);
			append(div1, t1);
			append(div1, label_1);
			append(label_1, input);
			append(label_1, t2);
			append(label_1, div0);

			if (!mounted) {
				dispose = [
					listen(input, "click", /*click_handler_1*/ ctx[9]),
					listen(div1, "click", /*click_handler_2*/ ctx[10])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*label*/ 128) set_data(t0, /*label*/ ctx[7]);

			if (dirty & /*withMessage*/ 32) {
				input.checked = /*withMessage*/ ctx[5];
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (15:2) <StepWrapper      class="max-w-screen-lg mx-auto"      bind:editable      bind:stepInd      bind:step      bind:stepsList      {numberOfSteps}      on:mouseenter={() => {        if (editable) {          stepper = true;        }      }}      on:mouseleave={() => {        stepper = false;      }}    >
function create_default_slot(ctx) {
	let div3;
	let div0;
	let t0;
	let t1;
	let div1;
	let t2;
	let div2;

	function select_block_type(ctx, dirty) {
		if (/*withMessage*/ ctx[5] && /*stepInd*/ ctx[1] == /*numberOfSteps*/ ctx[6] - 1) return create_if_block_1$1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*stepInd*/ ctx[1] == /*numberOfSteps*/ ctx[6] - 1 && create_if_block$2(ctx);

	return {
		c() {
			div3 = element("div");
			div0 = element("div");
			t0 = space();
			if_block0.c();
			t1 = space();
			div1 = element("div");
			t2 = space();
			div2 = element("div");
			if (if_block1) if_block1.c();
			attr(div0, "class", "border-t-2 border-dashed border-gray-300 h-1 w-2/5 shrink-0");
			attr(div1, "class", "flex-auto border-t-2 border-dashed border-gray-300 h-1");
			attr(div2, "class", "mb-2");
			attr(div3, "class", "flex items-center py-2 my-4 w-full");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			append(div3, t0);
			if_block0.m(div3, null);
			append(div3, t1);
			append(div3, div1);
			append(div3, t2);
			append(div3, div2);
			if (if_block1) if_block1.m(div2, null);
		},
		p(ctx, dirty) {
			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div3, t1);
				}
			}

			if (/*stepInd*/ ctx[1] == /*numberOfSteps*/ ctx[6] - 1) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$2(ctx);
					if_block1.c();
					if_block1.m(div2, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d(detaching) {
			if (detaching) detach(div3);
			if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

function create_fragment$2(ctx) {
	let div;
	let stepwrapper;
	let updating_editable;
	let updating_stepInd;
	let updating_step;
	let updating_stepsList;
	let current;

	function stepwrapper_editable_binding(value) {
		/*stepwrapper_editable_binding*/ ctx[11](value);
	}

	function stepwrapper_stepInd_binding(value) {
		/*stepwrapper_stepInd_binding*/ ctx[12](value);
	}

	function stepwrapper_step_binding(value) {
		/*stepwrapper_step_binding*/ ctx[13](value);
	}

	function stepwrapper_stepsList_binding(value) {
		/*stepwrapper_stepsList_binding*/ ctx[14](value);
	}

	let stepwrapper_props = {
		class: "max-w-screen-lg mx-auto",
		numberOfSteps: /*numberOfSteps*/ ctx[6],
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	if (/*editable*/ ctx[0] !== void 0) {
		stepwrapper_props.editable = /*editable*/ ctx[0];
	}

	if (/*stepInd*/ ctx[1] !== void 0) {
		stepwrapper_props.stepInd = /*stepInd*/ ctx[1];
	}

	if (/*step*/ ctx[2] !== void 0) {
		stepwrapper_props.step = /*step*/ ctx[2];
	}

	if (/*stepsList*/ ctx[3] !== void 0) {
		stepwrapper_props.stepsList = /*stepsList*/ ctx[3];
	}

	stepwrapper = new StepWrapper({ props: stepwrapper_props });
	binding_callbacks.push(() => bind(stepwrapper, 'editable', stepwrapper_editable_binding, /*editable*/ ctx[0]));
	binding_callbacks.push(() => bind(stepwrapper, 'stepInd', stepwrapper_stepInd_binding, /*stepInd*/ ctx[1]));
	binding_callbacks.push(() => bind(stepwrapper, 'step', stepwrapper_step_binding, /*step*/ ctx[2]));
	binding_callbacks.push(() => bind(stepwrapper, 'stepsList', stepwrapper_stepsList_binding, /*stepsList*/ ctx[3]));
	stepwrapper.$on("mouseenter", /*mouseenter_handler*/ ctx[15]);
	stepwrapper.$on("mouseleave", /*mouseleave_handler*/ ctx[16]);

	return {
		c() {
			div = element("div");
			create_component(stepwrapper.$$.fragment);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(stepwrapper, div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const stepwrapper_changes = {};
			if (dirty & /*numberOfSteps*/ 64) stepwrapper_changes.numberOfSteps = /*numberOfSteps*/ ctx[6];

			if (dirty & /*$$scope, withMessage, label, stepInd, numberOfSteps*/ 131298) {
				stepwrapper_changes.$$scope = { dirty, ctx };
			}

			if (!updating_editable && dirty & /*editable*/ 1) {
				updating_editable = true;
				stepwrapper_changes.editable = /*editable*/ ctx[0];
				add_flush_callback(() => updating_editable = false);
			}

			if (!updating_stepInd && dirty & /*stepInd*/ 2) {
				updating_stepInd = true;
				stepwrapper_changes.stepInd = /*stepInd*/ ctx[1];
				add_flush_callback(() => updating_stepInd = false);
			}

			if (!updating_step && dirty & /*step*/ 4) {
				updating_step = true;
				stepwrapper_changes.step = /*step*/ ctx[2];
				add_flush_callback(() => updating_step = false);
			}

			if (!updating_stepsList && dirty & /*stepsList*/ 8) {
				updating_stepsList = true;
				stepwrapper_changes.stepsList = /*stepsList*/ ctx[3];
				add_flush_callback(() => updating_stepsList = false);
			}

			stepwrapper.$set(stepwrapper_changes);
		},
		i(local) {
			if (current) return;
			transition_in(stepwrapper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(stepwrapper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(stepwrapper);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let { editable } = $$props;
	let { stepInd } = $$props;
	let { step } = $$props;
	let { stepsList } = $$props;
	let { stepper } = $$props;
	let { numberOfSteps } = $$props;
	let { label } = $$props;
	let { withMessage } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	const click_handler_1 = () => {
		$$invalidate(5, withMessage = !withMessage);
	};

	const click_handler_2 = () => {
		$$invalidate(5, withMessage = !withMessage);
	};

	function stepwrapper_editable_binding(value) {
		editable = value;
		$$invalidate(0, editable);
	}

	function stepwrapper_stepInd_binding(value) {
		stepInd = value;
		$$invalidate(1, stepInd);
	}

	function stepwrapper_step_binding(value) {
		step = value;
		$$invalidate(2, step);
	}

	function stepwrapper_stepsList_binding(value) {
		stepsList = value;
		$$invalidate(3, stepsList);
	}

	const mouseenter_handler = () => {
		if (editable) {
			$$invalidate(4, stepper = true);
		}
	};

	const mouseleave_handler = () => {
		$$invalidate(4, stepper = false);
	};

	$$self.$$set = $$props => {
		if ('editable' in $$props) $$invalidate(0, editable = $$props.editable);
		if ('stepInd' in $$props) $$invalidate(1, stepInd = $$props.stepInd);
		if ('step' in $$props) $$invalidate(2, step = $$props.step);
		if ('stepsList' in $$props) $$invalidate(3, stepsList = $$props.stepsList);
		if ('stepper' in $$props) $$invalidate(4, stepper = $$props.stepper);
		if ('numberOfSteps' in $$props) $$invalidate(6, numberOfSteps = $$props.numberOfSteps);
		if ('label' in $$props) $$invalidate(7, label = $$props.label);
		if ('withMessage' in $$props) $$invalidate(5, withMessage = $$props.withMessage);
	};

	return [
		editable,
		stepInd,
		step,
		stepsList,
		stepper,
		withMessage,
		numberOfSteps,
		label,
		click_handler,
		click_handler_1,
		click_handler_2,
		stepwrapper_editable_binding,
		stepwrapper_stepInd_binding,
		stepwrapper_step_binding,
		stepwrapper_stepsList_binding,
		mouseenter_handler,
		mouseleave_handler
	];
}

class StepLine extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
			editable: 0,
			stepInd: 1,
			step: 2,
			stepsList: 3,
			stepper: 4,
			numberOfSteps: 6,
			label: 7,
			withMessage: 5
		});
	}
}

/* src/lib/FormBuilder.svelte generated by Svelte v3.55.0 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[33] = list[i];
	child_ctx[34] = list;
	child_ctx[35] = i;
	return child_ctx;
}

// (174:37) 
function create_if_block_4(ctx) {
	let editor;
	let current;

	editor = new Editor({
			props: {
				arr_html: /*formStore*/ ctx[0].props.message,
				editable: /*editable*/ ctx[4]
			}
		});

	return {
		c() {
			create_component(editor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(editor, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const editor_changes = {};
			if (dirty[0] & /*formStore*/ 1) editor_changes.arr_html = /*formStore*/ ctx[0].props.message;
			if (dirty[0] & /*editable*/ 16) editor_changes.editable = /*editable*/ ctx[4];
			editor.$set(editor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(editor, detaching);
		}
	};
}

// (162:38) 
function create_if_block_3(ctx) {
	let step;
	let updating_theme;
	let updating_step;
	let updating_numberOfSteps;
	let updating_stepsList;
	let updating_stepInd;
	let current;

	function step_theme_binding_1(value) {
		/*step_theme_binding_1*/ ctx[26](value);
	}

	function step_step_binding_1(value) {
		/*step_step_binding_1*/ ctx[27](value);
	}

	function step_numberOfSteps_binding_1(value) {
		/*step_numberOfSteps_binding_1*/ ctx[28](value);
	}

	function step_stepsList_binding_1(value) {
		/*step_stepsList_binding_1*/ ctx[29](value);
	}

	function step_stepInd_binding(value) {
		/*step_stepInd_binding*/ ctx[30](value);
	}

	let step_props = {
		editable: /*editable*/ ctx[4],
		buttonBgColor: /*buttonBgColor*/ ctx[7],
		buttonTextColor: /*buttonTextColor*/ ctx[8]
	};

	if (/*theme*/ ctx[3] !== void 0) {
		step_props.theme = /*theme*/ ctx[3];
	}

	if (/*formStore*/ ctx[0].steps[/*stepInd*/ ctx[1]] !== void 0) {
		step_props.step = /*formStore*/ ctx[0].steps[/*stepInd*/ ctx[1]];
	}

	if (/*formStore*/ ctx[0].steps.length !== void 0) {
		step_props.numberOfSteps = /*formStore*/ ctx[0].steps.length;
	}

	if (/*formStore*/ ctx[0].steps !== void 0) {
		step_props.stepsList = /*formStore*/ ctx[0].steps;
	}

	if (/*stepInd*/ ctx[1] !== void 0) {
		step_props.stepInd = /*stepInd*/ ctx[1];
	}

	step = new Step({ props: step_props });
	binding_callbacks.push(() => bind(step, 'theme', step_theme_binding_1, /*theme*/ ctx[3]));
	binding_callbacks.push(() => bind(step, 'step', step_step_binding_1, /*formStore*/ ctx[0].steps[/*stepInd*/ ctx[1]]));
	binding_callbacks.push(() => bind(step, 'numberOfSteps', step_numberOfSteps_binding_1, /*formStore*/ ctx[0].steps.length));
	binding_callbacks.push(() => bind(step, 'stepsList', step_stepsList_binding_1, /*formStore*/ ctx[0].steps));
	binding_callbacks.push(() => bind(step, 'stepInd', step_stepInd_binding, /*stepInd*/ ctx[1]));
	step.$on("submit", /*submitForm*/ ctx[12]);

	return {
		c() {
			create_component(step.$$.fragment);
		},
		m(target, anchor) {
			mount_component(step, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const step_changes = {};
			if (dirty[0] & /*editable*/ 16) step_changes.editable = /*editable*/ ctx[4];
			if (dirty[0] & /*buttonBgColor*/ 128) step_changes.buttonBgColor = /*buttonBgColor*/ ctx[7];
			if (dirty[0] & /*buttonTextColor*/ 256) step_changes.buttonTextColor = /*buttonTextColor*/ ctx[8];

			if (!updating_theme && dirty[0] & /*theme*/ 8) {
				updating_theme = true;
				step_changes.theme = /*theme*/ ctx[3];
				add_flush_callback(() => updating_theme = false);
			}

			if (!updating_step && dirty[0] & /*formStore, stepInd*/ 3) {
				updating_step = true;
				step_changes.step = /*formStore*/ ctx[0].steps[/*stepInd*/ ctx[1]];
				add_flush_callback(() => updating_step = false);
			}

			if (!updating_numberOfSteps && dirty[0] & /*formStore*/ 1) {
				updating_numberOfSteps = true;
				step_changes.numberOfSteps = /*formStore*/ ctx[0].steps.length;
				add_flush_callback(() => updating_numberOfSteps = false);
			}

			if (!updating_stepsList && dirty[0] & /*formStore*/ 1) {
				updating_stepsList = true;
				step_changes.stepsList = /*formStore*/ ctx[0].steps;
				add_flush_callback(() => updating_stepsList = false);
			}

			if (!updating_stepInd && dirty[0] & /*stepInd*/ 2) {
				updating_stepInd = true;
				step_changes.stepInd = /*stepInd*/ ctx[1];
				add_flush_callback(() => updating_stepInd = false);
			}

			step.$set(step_changes);
		},
		i(local) {
			if (current) return;
			transition_in(step.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(step.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(step, detaching);
		}
	};
}

// (116:2) {#if editable}
function create_if_block$1(ctx) {
	let t0;
	let div;
	let t1;
	let current;
	let if_block0 = /*canSaveForm*/ ctx[9] && create_if_block_2(ctx);
	let each_value = /*formStore*/ ctx[0]?.steps ?? [];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block1 = /*formStore*/ ctx[0]?.props.withMessage && create_if_block_1(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = space();
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			if (if_block1) if_block1.c();
			attr(div, "class", "relative pt-4 pb-10");
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t0, anchor);
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			append(div, t1);
			if (if_block1) if_block1.m(div, null);
			current = true;
		},
		p(ctx, dirty) {
			if (/*canSaveForm*/ ctx[9]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*editable, stepper, label, formStore, addStep, buttonBgColor, buttonTextColor, theme, submitForm*/ 5625) {
				each_value = /*formStore*/ ctx[0]?.steps ?? [];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, t1);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (/*formStore*/ ctx[0]?.props.withMessage) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*formStore*/ 1) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block1);
			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t0);
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
			if (if_block1) if_block1.d();
		}
	};
}

// (117:4) {#if canSaveForm}
function create_if_block_2(ctx) {
	let div1;
	let div0;
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			button = element("button");
			button.textContent = "Save Form";
			attr(button, "class", "px-4 py-2 rounded border bg-blue-700 text-blue-100");
			attr(div0, "class", "flex items-center justify-center p-10");
			attr(div1, "class", "flex justify-center");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, button);

			if (!mounted) {
				dispose = listen(button, "click", /*saveForm*/ ctx[11]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div1);
			mounted = false;
			dispose();
		}
	};
}

// (131:6) {#each formStore?.steps ?? [] as step, i}
function create_each_block(ctx) {
	let step;
	let updating_step;
	let updating_numberOfSteps;
	let updating_stepsList;
	let updating_theme;
	let t;
	let stepline;
	let updating_withMessage;
	let updating_step_1;
	let updating_numberOfSteps_1;
	let updating_stepsList_1;
	let current;

	function step_step_binding(value) {
		/*step_step_binding*/ ctx[16](value, /*step*/ ctx[33], /*each_value*/ ctx[34], /*i*/ ctx[35]);
	}

	function step_numberOfSteps_binding(value) {
		/*step_numberOfSteps_binding*/ ctx[17](value);
	}

	function step_stepsList_binding(value) {
		/*step_stepsList_binding*/ ctx[18](value);
	}

	function step_theme_binding(value) {
		/*step_theme_binding*/ ctx[19](value);
	}

	let step_props = {
		editable: /*editable*/ ctx[4],
		stepInd: /*i*/ ctx[35],
		buttonBgColor: /*buttonBgColor*/ ctx[7],
		buttonTextColor: /*buttonTextColor*/ ctx[8]
	};

	if (/*step*/ ctx[33] !== void 0) {
		step_props.step = /*step*/ ctx[33];
	}

	if (/*formStore*/ ctx[0].steps.length !== void 0) {
		step_props.numberOfSteps = /*formStore*/ ctx[0].steps.length;
	}

	if (/*formStore*/ ctx[0].steps !== void 0) {
		step_props.stepsList = /*formStore*/ ctx[0].steps;
	}

	if (/*theme*/ ctx[3] !== void 0) {
		step_props.theme = /*theme*/ ctx[3];
	}

	step = new Step({ props: step_props });
	binding_callbacks.push(() => bind(step, 'step', step_step_binding, /*step*/ ctx[33]));
	binding_callbacks.push(() => bind(step, 'numberOfSteps', step_numberOfSteps_binding, /*formStore*/ ctx[0].steps.length));
	binding_callbacks.push(() => bind(step, 'stepsList', step_stepsList_binding, /*formStore*/ ctx[0].steps));
	binding_callbacks.push(() => bind(step, 'theme', step_theme_binding, /*theme*/ ctx[3]));
	step.$on("submit", /*submitForm*/ ctx[12]);

	function stepline_withMessage_binding(value) {
		/*stepline_withMessage_binding*/ ctx[20](value);
	}

	function stepline_step_binding(value) {
		/*stepline_step_binding*/ ctx[21](value, /*step*/ ctx[33], /*each_value*/ ctx[34], /*i*/ ctx[35]);
	}

	function stepline_numberOfSteps_binding(value) {
		/*stepline_numberOfSteps_binding*/ ctx[22](value);
	}

	function stepline_stepsList_binding(value) {
		/*stepline_stepsList_binding*/ ctx[23](value);
	}

	function click_handler() {
		return /*click_handler*/ ctx[24](/*i*/ ctx[35]);
	}

	let stepline_props = {
		editable: /*editable*/ ctx[4],
		stepInd: /*i*/ ctx[35],
		stepper: /*stepper*/ ctx[5],
		label: /*label*/ ctx[6]
	};

	if (/*formStore*/ ctx[0].props.withMessage !== void 0) {
		stepline_props.withMessage = /*formStore*/ ctx[0].props.withMessage;
	}

	if (/*step*/ ctx[33] !== void 0) {
		stepline_props.step = /*step*/ ctx[33];
	}

	if (/*formStore*/ ctx[0].steps.length !== void 0) {
		stepline_props.numberOfSteps = /*formStore*/ ctx[0].steps.length;
	}

	if (/*formStore*/ ctx[0].steps !== void 0) {
		stepline_props.stepsList = /*formStore*/ ctx[0].steps;
	}

	stepline = new StepLine({ props: stepline_props });
	binding_callbacks.push(() => bind(stepline, 'withMessage', stepline_withMessage_binding, /*formStore*/ ctx[0].props.withMessage));
	binding_callbacks.push(() => bind(stepline, 'step', stepline_step_binding, /*step*/ ctx[33]));
	binding_callbacks.push(() => bind(stepline, 'numberOfSteps', stepline_numberOfSteps_binding, /*formStore*/ ctx[0].steps.length));
	binding_callbacks.push(() => bind(stepline, 'stepsList', stepline_stepsList_binding, /*formStore*/ ctx[0].steps));
	stepline.$on("click", click_handler);

	return {
		c() {
			create_component(step.$$.fragment);
			t = space();
			create_component(stepline.$$.fragment);
		},
		m(target, anchor) {
			mount_component(step, target, anchor);
			insert(target, t, anchor);
			mount_component(stepline, target, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const step_changes = {};
			if (dirty[0] & /*editable*/ 16) step_changes.editable = /*editable*/ ctx[4];
			if (dirty[0] & /*buttonBgColor*/ 128) step_changes.buttonBgColor = /*buttonBgColor*/ ctx[7];
			if (dirty[0] & /*buttonTextColor*/ 256) step_changes.buttonTextColor = /*buttonTextColor*/ ctx[8];

			if (!updating_step && dirty[0] & /*formStore*/ 1) {
				updating_step = true;
				step_changes.step = /*step*/ ctx[33];
				add_flush_callback(() => updating_step = false);
			}

			if (!updating_numberOfSteps && dirty[0] & /*formStore*/ 1) {
				updating_numberOfSteps = true;
				step_changes.numberOfSteps = /*formStore*/ ctx[0].steps.length;
				add_flush_callback(() => updating_numberOfSteps = false);
			}

			if (!updating_stepsList && dirty[0] & /*formStore*/ 1) {
				updating_stepsList = true;
				step_changes.stepsList = /*formStore*/ ctx[0].steps;
				add_flush_callback(() => updating_stepsList = false);
			}

			if (!updating_theme && dirty[0] & /*theme*/ 8) {
				updating_theme = true;
				step_changes.theme = /*theme*/ ctx[3];
				add_flush_callback(() => updating_theme = false);
			}

			step.$set(step_changes);
			const stepline_changes = {};
			if (dirty[0] & /*editable*/ 16) stepline_changes.editable = /*editable*/ ctx[4];
			if (dirty[0] & /*stepper*/ 32) stepline_changes.stepper = /*stepper*/ ctx[5];
			if (dirty[0] & /*label*/ 64) stepline_changes.label = /*label*/ ctx[6];

			if (!updating_withMessage && dirty[0] & /*formStore*/ 1) {
				updating_withMessage = true;
				stepline_changes.withMessage = /*formStore*/ ctx[0].props.withMessage;
				add_flush_callback(() => updating_withMessage = false);
			}

			if (!updating_step_1 && dirty[0] & /*formStore*/ 1) {
				updating_step_1 = true;
				stepline_changes.step = /*step*/ ctx[33];
				add_flush_callback(() => updating_step_1 = false);
			}

			if (!updating_numberOfSteps_1 && dirty[0] & /*formStore*/ 1) {
				updating_numberOfSteps_1 = true;
				stepline_changes.numberOfSteps = /*formStore*/ ctx[0].steps.length;
				add_flush_callback(() => updating_numberOfSteps_1 = false);
			}

			if (!updating_stepsList_1 && dirty[0] & /*formStore*/ 1) {
				updating_stepsList_1 = true;
				stepline_changes.stepsList = /*formStore*/ ctx[0].steps;
				add_flush_callback(() => updating_stepsList_1 = false);
			}

			stepline.$set(stepline_changes);
		},
		i(local) {
			if (current) return;
			transition_in(step.$$.fragment, local);
			transition_in(stepline.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(step.$$.fragment, local);
			transition_out(stepline.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(step, detaching);
			if (detaching) detach(t);
			destroy_component(stepline, detaching);
		}
	};
}

// (156:6) {#if formStore?.props.withMessage}
function create_if_block_1(ctx) {
	let div;
	let editor;
	let updating_arr_html;
	let current;

	function editor_arr_html_binding(value) {
		/*editor_arr_html_binding*/ ctx[25](value);
	}

	let editor_props = { editable: /*editable*/ ctx[4] };

	if (/*formStore*/ ctx[0].props.message !== void 0) {
		editor_props.arr_html = /*formStore*/ ctx[0].props.message;
	}

	editor = new Editor({ props: editor_props });
	binding_callbacks.push(() => bind(editor, 'arr_html', editor_arr_html_binding, /*formStore*/ ctx[0].props.message));

	return {
		c() {
			div = element("div");
			create_component(editor.$$.fragment);
			attr(div, "class", "px-4");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(editor, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const editor_changes = {};
			if (dirty[0] & /*editable*/ 16) editor_changes.editable = /*editable*/ ctx[4];

			if (!updating_arr_html && dirty[0] & /*formStore*/ 1) {
				updating_arr_html = true;
				editor_changes.arr_html = /*formStore*/ ctx[0].props.message;
				add_flush_callback(() => updating_arr_html = false);
			}

			editor.$set(editor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(editor);
		}
	};
}

function create_fragment$1(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block$1, create_if_block_3, create_if_block_4];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*editable*/ ctx[4]) return 0;
		if (!/*editable*/ ctx[4] && !/*withMessage*/ ctx[2]) return 1;
		if (!/*editable*/ ctx[4] && /*withMessage*/ ctx[2]) return 2;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			attr(div, "class", "p-5 bg-secondary text-primary max-w-screen-lg mx-auto");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(div, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(div, null);
				} else {
					if_block = null;
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let { editable } = $$props;
	let { stepper } = $$props;
	let { label = "'thank you' Page" } = $$props;
	let { __service } = $$props;
	let { stepInd = 0 } = $$props;
	let { buttonBgColor } = $$props;
	let { buttonTextColor } = $$props;
	let { canSaveForm = false } = $$props;
	let { formStore = null } = $$props;

	// let steps = formStore?.steps;
	let oldEditable = false;

	let arr_msg = [
		{
			html: "Thank you!! Your submission has been sent.",
			klass: "text-center md:text-xl text-lg"
		}
	];

	let { withMessage = false } = $$props;
	let { theme = "simple" } = $$props;

	let { form = {
		steps: [{ key: randomString(), inputs: [] }],
		props: { withMessage: false, message: arr_msg },
		theme
	} } = $$props;

	async function initForm(formInputs) {
		if (formStore && !formInputs) {
			$$invalidate(13, form = formStore);
		} else {
			$$invalidate(13, form = await window.Fouita.Form.init(__service, formInputs ?? {}));
		}

		$$invalidate(13, form.props ||= { withMessage: false, message: arr_msg }, form);
		$$invalidate(0, formStore = form);

		for (let s of formStore.steps) {
			if (!s.inputs?.length) {
				s.inputs = [];
			}
		}
	}

	function addStep(index) {
		let step = {
			key: randomString(),
			inputs: [],
			props: { nextBtn: "Next", previousBtn: "Back" }
		};

		formStore.steps.splice(index + 1, 0, step);
		(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
	}

	function saveForm() {
		$$invalidate(0, formStore.version = "" + (+(formStore.version ?? 0) + 1), formStore);
		initForm(formStore);
	}

	async function submitForm() {
		if (!formStore?.steps) {
			console.error("No steps found!");
			return;
		}

		formStore.steps.forEach(element => {
			element.inputs.forEach(e => {
				if (typeof e.value !== "string") {
					e.value = e.value?.toString() ?? "";
				}
			});
		});

		await Fouita.Form.submit(formStore);

		if (formStore.props.withMessage) {
			$$invalidate(2, withMessage = true);
		}
	}

	initForm();

	function step_step_binding(value, step, each_value, i) {
		each_value[i] = value;
		(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
	}

	function step_numberOfSteps_binding(value) {
		if ($$self.$$.not_equal(formStore.steps.length, value)) {
			formStore.steps.length = value;
			(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
		}
	}

	function step_stepsList_binding(value) {
		if ($$self.$$.not_equal(formStore.steps, value)) {
			formStore.steps = value;
			(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
		}
	}

	function step_theme_binding(value) {
		theme = value;
		$$invalidate(3, theme);
	}

	function stepline_withMessage_binding(value) {
		if ($$self.$$.not_equal(formStore.props.withMessage, value)) {
			formStore.props.withMessage = value;
			(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
		}
	}

	function stepline_step_binding(value, step, each_value, i) {
		each_value[i] = value;
		(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
	}

	function stepline_numberOfSteps_binding(value) {
		if ($$self.$$.not_equal(formStore.steps.length, value)) {
			formStore.steps.length = value;
			(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
		}
	}

	function stepline_stepsList_binding(value) {
		if ($$self.$$.not_equal(formStore.steps, value)) {
			formStore.steps = value;
			(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
		}
	}

	const click_handler = i => addStep(i);

	function editor_arr_html_binding(value) {
		if ($$self.$$.not_equal(formStore.props.message, value)) {
			formStore.props.message = value;
			(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
		}
	}

	function step_theme_binding_1(value) {
		theme = value;
		$$invalidate(3, theme);
	}

	function step_step_binding_1(value) {
		if ($$self.$$.not_equal(formStore.steps[stepInd], value)) {
			formStore.steps[stepInd] = value;
			(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
		}
	}

	function step_numberOfSteps_binding_1(value) {
		if ($$self.$$.not_equal(formStore.steps.length, value)) {
			formStore.steps.length = value;
			(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
		}
	}

	function step_stepsList_binding_1(value) {
		if ($$self.$$.not_equal(formStore.steps, value)) {
			formStore.steps = value;
			(($$invalidate(0, formStore), $$invalidate(4, editable)), $$invalidate(15, oldEditable));
		}
	}

	function step_stepInd_binding(value) {
		stepInd = value;
		((($$invalidate(1, stepInd), $$invalidate(4, editable)), $$invalidate(15, oldEditable)), $$invalidate(0, formStore));
	}

	$$self.$$set = $$props => {
		if ('editable' in $$props) $$invalidate(4, editable = $$props.editable);
		if ('stepper' in $$props) $$invalidate(5, stepper = $$props.stepper);
		if ('label' in $$props) $$invalidate(6, label = $$props.label);
		if ('__service' in $$props) $$invalidate(14, __service = $$props.__service);
		if ('stepInd' in $$props) $$invalidate(1, stepInd = $$props.stepInd);
		if ('buttonBgColor' in $$props) $$invalidate(7, buttonBgColor = $$props.buttonBgColor);
		if ('buttonTextColor' in $$props) $$invalidate(8, buttonTextColor = $$props.buttonTextColor);
		if ('canSaveForm' in $$props) $$invalidate(9, canSaveForm = $$props.canSaveForm);
		if ('formStore' in $$props) $$invalidate(0, formStore = $$props.formStore);
		if ('withMessage' in $$props) $$invalidate(2, withMessage = $$props.withMessage);
		if ('theme' in $$props) $$invalidate(3, theme = $$props.theme);
		if ('form' in $$props) $$invalidate(13, form = $$props.form);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*editable, oldEditable*/ 32784) {
			if (editable !== oldEditable && !editable) {
				$$invalidate(15, oldEditable = editable);
			}
		}

		if ($$self.$$.dirty[0] & /*editable, oldEditable, formStore*/ 32785) {
			if (editable !== oldEditable && editable) {
				$$invalidate(15, oldEditable = editable);
				$$invalidate(1, stepInd = 0);

				// change formStore version, this will make the update go through
				if (formStore) {
					$$invalidate(0, formStore.version = "" + (+(formStore.version ?? 0) + 1), formStore);
				}
			}
		}
	};

	return [
		formStore,
		stepInd,
		withMessage,
		theme,
		editable,
		stepper,
		label,
		buttonBgColor,
		buttonTextColor,
		canSaveForm,
		addStep,
		saveForm,
		submitForm,
		form,
		__service,
		oldEditable,
		step_step_binding,
		step_numberOfSteps_binding,
		step_stepsList_binding,
		step_theme_binding,
		stepline_withMessage_binding,
		stepline_step_binding,
		stepline_numberOfSteps_binding,
		stepline_stepsList_binding,
		click_handler,
		editor_arr_html_binding,
		step_theme_binding_1,
		step_step_binding_1,
		step_numberOfSteps_binding_1,
		step_stepsList_binding_1,
		step_stepInd_binding
	];
}

class FormBuilder extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$1,
			create_fragment$1,
			safe_not_equal,
			{
				editable: 4,
				stepper: 5,
				label: 6,
				__service: 14,
				stepInd: 1,
				buttonBgColor: 7,
				buttonTextColor: 8,
				canSaveForm: 9,
				formStore: 0,
				withMessage: 2,
				theme: 3,
				form: 13
			},
			null,
			[-1, -1]
		);
	}
}

/* src/App.svelte generated by Svelte v3.55.0 */

function create_if_block(ctx) {
	let div;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<i class="fa-light fa-pen text-xl text-indigo-700"></i>`;
			attr(div, "class", "absolute right-0 top-7 cursor-pointer rounded-l p-3 bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-50 focus:drop-shadow-sm focus:outline-indigo-300 ");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(div, "click", /*click_handler*/ ctx[10]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let t;
	let main;
	let formbuilder;
	let updating_form;
	let current;
	let if_block = /*canSaveForm*/ ctx[9] && create_if_block(ctx);

	function formbuilder_form_binding(value) {
		/*formbuilder_form_binding*/ ctx[11](value);
	}

	let formbuilder_props = {
		canSaveForm: /*canSaveForm*/ ctx[9],
		editable: /*editable*/ ctx[0],
		__service: /*__service*/ ctx[2],
		buttonBgColor: /*buttonBgColor*/ ctx[6],
		buttonTextColor: /*buttonTextColor*/ ctx[7]
	};

	if (/*form*/ ctx[1] !== void 0) {
		formbuilder_props.form = /*form*/ ctx[1];
	}

	formbuilder = new FormBuilder({ props: formbuilder_props });
	binding_callbacks.push(() => bind(formbuilder, 'form', formbuilder_form_binding, /*form*/ ctx[1]));

	return {
		c() {
			if (if_block) if_block.c();
			t = space();
			main = element("main");
			create_component(formbuilder.$$.fragment);
			attr(main, "class", "max-w-screen-xl");
			set_style(main, "--ft-primary", /*textColor*/ ctx[3]);
			set_style(main, "--ft-secondary", /*bgColor*/ ctx[4]);
			set_style(main, "--ft-tertiary", /*borderColor*/ ctx[8]);
			set_style(main, "--ft-quaternary", /*outlineColor*/ ctx[5]);
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, t, anchor);
			insert(target, main, anchor);
			mount_component(formbuilder, main, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*canSaveForm*/ ctx[9]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(t.parentNode, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			const formbuilder_changes = {};
			if (dirty & /*canSaveForm*/ 512) formbuilder_changes.canSaveForm = /*canSaveForm*/ ctx[9];
			if (dirty & /*editable*/ 1) formbuilder_changes.editable = /*editable*/ ctx[0];
			if (dirty & /*__service*/ 4) formbuilder_changes.__service = /*__service*/ ctx[2];
			if (dirty & /*buttonBgColor*/ 64) formbuilder_changes.buttonBgColor = /*buttonBgColor*/ ctx[6];
			if (dirty & /*buttonTextColor*/ 128) formbuilder_changes.buttonTextColor = /*buttonTextColor*/ ctx[7];

			if (!updating_form && dirty & /*form*/ 2) {
				updating_form = true;
				formbuilder_changes.form = /*form*/ ctx[1];
				add_flush_callback(() => updating_form = false);
			}

			formbuilder.$set(formbuilder_changes);

			if (!current || dirty & /*textColor*/ 8) {
				set_style(main, "--ft-primary", /*textColor*/ ctx[3]);
			}

			if (!current || dirty & /*bgColor*/ 16) {
				set_style(main, "--ft-secondary", /*bgColor*/ ctx[4]);
			}

			if (!current || dirty & /*borderColor*/ 256) {
				set_style(main, "--ft-tertiary", /*borderColor*/ ctx[8]);
			}

			if (!current || dirty & /*outlineColor*/ 32) {
				set_style(main, "--ft-quaternary", /*outlineColor*/ ctx[5]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(formbuilder.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(formbuilder.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(t);
			if (detaching) detach(main);
			destroy_component(formbuilder);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { __service = "0x556b3" } = $$props;
	let { editable = true } = $$props;
	let { textColor = "0 0 0" } = $$props;
	let { bgColor = "250 250 250" } = $$props;
	let { outlineColor = "165 180 252" } = $$props;
	let { buttonBgColor = "79 70 229" } = $$props;
	let { buttonTextColor = "255 255 255" } = $$props;
	let { borderColor = "200 200 200" } = $$props;
	let { canSaveForm = false } = $$props;
	let { form } = $$props;
	const click_handler = () => $$invalidate(0, editable = !editable);

	function formbuilder_form_binding(value) {
		form = value;
		$$invalidate(1, form);
	}

	$$self.$$set = $$props => {
		if ('__service' in $$props) $$invalidate(2, __service = $$props.__service);
		if ('editable' in $$props) $$invalidate(0, editable = $$props.editable);
		if ('textColor' in $$props) $$invalidate(3, textColor = $$props.textColor);
		if ('bgColor' in $$props) $$invalidate(4, bgColor = $$props.bgColor);
		if ('outlineColor' in $$props) $$invalidate(5, outlineColor = $$props.outlineColor);
		if ('buttonBgColor' in $$props) $$invalidate(6, buttonBgColor = $$props.buttonBgColor);
		if ('buttonTextColor' in $$props) $$invalidate(7, buttonTextColor = $$props.buttonTextColor);
		if ('borderColor' in $$props) $$invalidate(8, borderColor = $$props.borderColor);
		if ('canSaveForm' in $$props) $$invalidate(9, canSaveForm = $$props.canSaveForm);
		if ('form' in $$props) $$invalidate(1, form = $$props.form);
	};

	return [
		editable,
		form,
		__service,
		textColor,
		bgColor,
		outlineColor,
		buttonBgColor,
		buttonTextColor,
		borderColor,
		canSaveForm,
		click_handler,
		formbuilder_form_binding
	];
}

class App extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			__service: 2,
			editable: 0,
			textColor: 3,
			bgColor: 4,
			outlineColor: 5,
			buttonBgColor: 6,
			buttonTextColor: 7,
			borderColor: 8,
			canSaveForm: 9,
			form: 1
		});
	}
}

// add form style if does not exist (on window)
function addFormStyle() {
  let elm = document.getElementById("ft-form-style");
  if(!elm) {
    elm = document.createElement("link");
    elm.setAttribute("id", "ft-form-style");
    elm.setAttribute("rel", "stylesheet");
    elm.setAttribute("href", "https://cdn.fouita.com/assets/fouita/ft-form-1.css");
    document.head.append(elm);
  }
}

addFormStyle();

// const app = new App({
// 	target: document.getElementById('app1'),
//   props: {
//     canSaveForm: true
//   }
// });



// export default [app];

export { App as default };
