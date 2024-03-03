-- Lua 스크립트 정의
local key = KEYS[1]
redis.log(redis.LOG_NOTICE, "key: " .. key); 
local fields = {}
local startField = tonumber(ARGV[1])
redis.log(redis.LOG_NOTICE, "startField: " .. startField); 
local endField = tonumber(ARGV[2])
redis.log(redis.LOG_NOTICE, "endField " .. endField); 
for i = startField, endField do
    table.insert(fields, tostring(i))
end

for _, field in ipairs(fields) do
    local data = redis.call('HGET', key, field)  -- 필드의 데이터 가져오기
    if data then
        local decoded = cjson.decode(data)  -- JSON 데이터 디코딩
        decoded.currentStatus = 'OUT'  -- currentStatus 값을 'OUT'으로 업데이트
        local updatedData = cjson.encode(decoded)  -- 업데이트된 데이터 인코딩
        redis.call('HSET', key, field, updatedData)  -- 업데이트된 데이터 저장
    end
end

return "Success"
