local key = KEYS[1]
local value = redis.call('GET', key)
local newValue = value
if (not (value)) then
    value = 0
    redis.call("SETEX", key, 1, value)
end
if (tonumber(value) >= 4095) then
    local ttl = tonumber(redis.call("TTL", key))
    if (tonumber(ttl) == -2) then
        redis.call("SETEX", key, 1, 0)
    else
        return -1
    end
else
    newValue = redis.call('INCR', key);
end

return newValue
