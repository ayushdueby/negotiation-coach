#!/bin/bash
set -e

echo "📦 Building frontend..."
cd frontend && npm run build && cd ..

echo "🔨 Packaging Spring Boot JAR..."
cd backend && mvn package -DskipTests -q && cd ..

echo "✅ Done! JAR is at backend/target/negotiation-coach-0.0.1-SNAPSHOT.jar"
