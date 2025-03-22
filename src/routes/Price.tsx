import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api/api";
import styled from "styled-components";

interface Historical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

export default function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<Historical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    enabled: !!coinId,
    refetchInterval: 10000,
  });

  const priceData = (data ?? []).map((price) => Number(price.close));

  const currentPrice = priceData[priceData.length - 1] || 0;
  const previousPrice = priceData[priceData.length - 2] || currentPrice;
  const priceChange = previousPrice ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;

  return (
    <Container>
      {isLoading ? (
        <LoadingText>Loading price...</LoadingText>
      ) : (
        <PriceContainer>
          <p className="price-value">${currentPrice.toFixed(2)}</p>
          <p className={`price-change ${priceChange >= 0 ? "up" : "down"}`}>
            {priceChange >= 0 ? `+${priceChange.toFixed(2)}%` : `${priceChange.toFixed(2)}%`}
          </p>
        </PriceContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const LoadingText = styled.p`
  font-size: 20px;
  color: gray;
`;

const PriceContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  display: inline-block;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .price-value {
    font-size: 48px;
    font-weight: bold;
    color: #0fbcf9;
  }

  .price-change {
    font-size: 24px;
    font-weight: bold;
  }

  .up {
    color: #0be881;
  }

  .down {
    color: #ff3f34;
  }
`;
